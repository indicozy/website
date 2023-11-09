import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { AboutComponent } from "~/components/about";
import { aboutHandler } from "~/utils/about/aboutHandler";
import { getEnv } from "~/utils/getEnv";

export const useGetAboutData = routeLoader$(async (requestEvent) => {
  const env = getEnv(requestEvent);
  return await aboutHandler(env);
});

export default component$(() => {
  const getAboutData = useGetAboutData();
  return <AboutComponent data={getAboutData.value} />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
