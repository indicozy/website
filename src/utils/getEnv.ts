import { z } from "zod";

export const getEnv = () => {
  const env = import.meta.env;
  const zEnv = z.object({
    PUBLIC_QWIK_INSIGHTS_KEY: z.string(),
    PUBLIC_MARKDOWN_URL: z.string(),
    PUBLIC_IQAIR_API_KEY: z.string(),
    PUBLIC_GOOGLE_MAPS_API: z.string(),
  });

  return zEnv.parse(env);
};
