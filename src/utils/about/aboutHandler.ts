import { getAqi } from "./aqi";
import { getCityLocation } from "./getCityLocation";
import { parseGithubAccount } from "./githubParser";
import { timezoneApi } from "./timezoneApi";

export const aboutHandler = async (signal?: AbortSignal) => {
  const github = await parseGithubAccount(signal);
  if (github.location === null) {
    throw Error("github.location === undefined");
  }
  const location = await getCityLocation(github.location, signal);
  // return { github };
  const [timezone, aqi] = await Promise.all([
    timezoneApi(location, signal),
    getAqi(location, signal),
  ]);
  return { github, aqi, timezone };
};
