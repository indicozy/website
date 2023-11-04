import z from "zod";
// API: GITHUB PUBLIC

const zodCheck = z.object({
  login: z.string(),
  avatar_url: z.string(),
  name: z.string(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  hireable: z.boolean(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
});

// TODO: refactor to show that it is demo data
const safeObject: z.infer<typeof zodCheck> = {
  login: "indicozy",
  avatar_url: "https://avatars.githubusercontent.com/u/51142471?v=4",
  name: "Berkut Karlibay",
  blog: "https://indicozy.com",
  location: "Astana, Kazakhstan",
  hireable: true,
  bio: "Hi there!",
  twitter_username: "indicozy",
};

export const parseGithubAccount: (
  signal?: AbortSignal
) => Promise<z.infer<typeof zodCheck>> = (signal) => {
  return fetch("https://api.github.com/users/indicozy", {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal: signal,
  })
    .then((res) => res.json())
    .then((data) => {
      if (!zodCheck.safeParse(data).success) {
        return safeObject;
      }
      return zodCheck.parse(data);
    })
    .catch(() => {
      return safeObject;
    });
};
