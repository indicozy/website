import { getAqi } from "./aqi";
import { getCityLocation } from "./getCityLocation";
import { parseGithubAccount } from "./githubParser";
import { timezoneApi } from "./timezoneApi";

export const aboutHandler = async () => {
  const github = await parseGithubAccount();
  if (github.location === null) {
    throw Error("github.location === undefined");
  }
  const location = await getCityLocation(github.location);
  // return { github };
  const [timezone, aqi] = await Promise.all([
    timezoneApi(location),
    getAqi(location),
  ]);
  return { github, aqi, timezone };
};
