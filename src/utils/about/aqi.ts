import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resSample = {
  status: "success",
  data: {
    city: "Astana",
    state: "Astana",
    country: "Kazakhstan",
    location: { type: "Point", coordinates: [71.4703558, 51.1605227] },
    current: {
      pollution: {
        ts: "2023-10-30T14:00:00.000Z",
        aqius: 29,
        mainus: "p2",
        aqicn: 10,
        maincn: "p2",
      },
      weather: {
        ts: "2023-10-30T14:00:00.000Z",
        tp: 5,
        pr: 1009,
        hu: 93,
        ws: 7,
        wd: 250,
        ic: "04n",
      },
    },
  },
};

const zRes = z.object({
  status: z.string(),
  data: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    location: z.object({
      type: z.string(),
      coordinates: z.array(z.number()).length(2),
    }),
    current: z.object({
      pollution: z.object({
        ts: z.string(),
        aqius: z.number(),
        mainus: z.string(),
        aqicn: z.number(),
        maincn: z.string(),
      }),
      weather: z.object({
        ts: z.string(),
        tp: z.number(),
        pr: z.number(),
        hu: z.number(),
        ws: z.number(),
        wd: z.number(),
        ic: z.string(),
      }),
    }),
  }),
});

export const getAqi = async (
  {
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  },
  signal?: AbortSignal
) => {
  const url = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${
    import.meta.env.PUBLIC_IQAIR_API_KEY
  }`;
  const data = await fetch(url, { signal }).then((res) => res.json());
  const dataClean = zRes.parse(data);
  return dataClean;
};
