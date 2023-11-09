import z from "zod";
import type { getEnv } from "../getEnv";

const zodCheck = z.object({
  login: z.string(),
  avatar_url: z.string(),
  name: z.string(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  hireable: z.boolean(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const githubExample = {
  login: "indicozy",
  id: 123123123,
  node_id: "",
  avatar_url: "https://avatars.githubusercontent.com/u/51142471?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/indicozy",
  html_url: "https://github.com/indicozy",
  followers_url: "https://api.github.com/users/indicozy/followers",
  following_url: "https://api.github.com/users/indicozy/following{/other_user}",
  gists_url: "https://api.github.com/users/indicozy/gists{/gist_id}",
  starred_url: "https://api.github.com/users/indicozy/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/indicozy/subscriptions",
  organizations_url: "https://api.github.com/users/indicozy/orgs",
  repos_url: "https://api.github.com/users/indicozy/repos",
  events_url: "https://api.github.com/users/indicozy/events{/privacy}",
  received_events_url: "https://api.github.com/users/indicozy/received_events",
  type: "User",
  site_admin: false,
  name: "",
  company: null,
  blog: "https://indicozy.com",
  location: "Astana, Kazakhstan",
  email: null,
  hireable: true,
  bio: "Hi there!",
  twitter_username: "indicozy",
  public_repos: 45,
  public_gists: 2,
  followers: 26,
  following: 34,
  created_at: "2019-05-29T01:13:30Z",
  updated_at: "2023-11-09T18:31:55Z",
};

export const parseGithubAccount: (
  env: ReturnType<typeof getEnv>
) => Promise<z.infer<typeof zodCheck>> = (env) => {
  return fetch("https://api.github.com/users/indicozy", {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${env.GITHUB_API_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return zodCheck.parse(data); // throws exceptions
    });
};
