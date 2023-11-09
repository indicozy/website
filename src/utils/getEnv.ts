import type { RequestEventLoader } from "@builder.io/qwik-city";
import { z } from "zod";

export const getEnvPublic = () => {
  const env = import.meta.env;
  const zEnv = z.object({
    PUBLIC_QWIK_INSIGHTS_KEY: z.string(),
    PUBLIC_MARKDOWN_URL: z.string(),
  });
  return zEnv.parse(env);
};

export const getEnv = (requestEvent: RequestEventLoader) => {
  const env = {
    IQAIR_API_KEY: requestEvent.env.get("IQAIR_API_KEY"),
    GOOGLE_MAPS_API: requestEvent.env.get("GOOGLE_MAPS_API"),
    GITHUB_API_KEY: requestEvent.env.get("GITHUB_API_KEY"),
  };
  const zEnv = z.object({
    IQAIR_API_KEY: z.string(),
    GOOGLE_MAPS_API: z.string(),
    GITHUB_API_KEY: z.string(),
  });

  return zEnv.parse(env);
};
