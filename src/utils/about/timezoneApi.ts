import { z } from "zod";
import type { getEnv } from "../getEnv";
// API: GOOGLE

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const returnSample = {
  dstOffset: 0,
  rawOffset: 21600,
  status: "OK",
  timeZoneId: "Asia/Almaty",
  timeZoneName: "East Kazakhstan Time",
};

const zRes = z.object({
  dstOffset: z.number(),
  rawOffset: z.number(),
  status: z.string(),
  timeZoneId: z.string(),
  timeZoneName: z.string(),
});

export const timezoneApi = async (
  location: {
    longitude: number;
    latitude: number;
  },
  env: ReturnType<typeof getEnv>
) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude}%2C${location.longitude}&timestamp=${timestamp}&key=${env.GOOGLE_MAPS_API}`;
  const res = await fetch(url).then((res) => res.json());

  const dataClean = zRes.parse(res);

  // https://forum.freecodecamp.org/t/convert-timezone-shift-in-seconds-from-utc-in-javascript/437305
  const nowInLocalTime = Date.now() + 1000 * dataClean.rawOffset;

  return { rawOffset: dataClean.rawOffset, timeNow: nowInLocalTime };
};
