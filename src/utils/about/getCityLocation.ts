import { z } from "zod";
// API: GOOGLE

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resSample = {
  results: [
    {
      address_components: [
        {
          long_name: "Astana",
          short_name: "Astana",
          types: ["locality", "political"],
        },
        {
          long_name: "Astana",
          short_name: "Astana",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Kazakhstan",
          short_name: "KZ",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Astana, Kazakhstan",
      geometry: {
        bounds: {
          northeast: {
            lat: 51.35111,
            lng: 71.78519129999999,
          },
          southwest: {
            lat: 50.85760759999999,
            lng: 71.21797339999999,
          },
        },
        location: {
          lat: 51.1655126,
          lng: 71.4272222,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 51.35111,
            lng: 71.78519129999999,
          },
          southwest: {
            lat: 50.85760759999999,
            lng: 71.21797339999999,
          },
        },
      },
      place_id: "ChIJCUa1fcSARUIRKJKx3Y0U-Zc",
      types: ["locality", "political"],
    },
  ],
  status: "OK",
};

const zRes = z.object({
  results: z.array(
    z.object({
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    })
  ),
});

export const getCityLocation = async (
  address: string,
  signal?: AbortSignal
) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${import.meta.env.PUBLIC_GOOGLE_MAPS_API}`;
  const data = await fetch(url, { signal: signal }).then((res) => res.json());
  const dataClean = zRes.parse(data);
  if (dataClean.results.length === 0) {
    throw Error("dataClean.results.length === 0");
  }
  const { location } = dataClean.results[0]!.geometry;
  return { latitude: location.lat, longitude: location.lng };
};
