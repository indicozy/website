import { getEnv } from "../getEnv";
import { parseGithubAccount } from "./githubParser";

export const aboutHandler = async (env: ReturnType<typeof getEnv>) => {
  const github = await parseGithubAccount(env);
  if (github.location === null) {
    throw Error("github.location === undefined");
  }
  // const location = await getCityLocation(github.location, env);
  // return { github };
  // const [timezone] = await Promise.all([
  //   timezoneApi(location, env),
  // getAqi(location, env),
  // ]);
  return { github };
};
