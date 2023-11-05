import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ObsidianGraphClient } from "~/components/obsidian/ObsidianGraph";
import { getEnv } from "~/utils/getEnv";

export const useGetGraphText = routeLoader$<string>(async () => {
  const url = getEnv().PUBLIC_MARKDOWN_URL + "/graph.gexf";
  // console.log(url);
  const gexfText = await fetch(url)
    .then((res) => res.text())
    .catch((err) => {
      console.log(err.cause);
      throw err;
    });
  return gexfText;
});

export default component$(() => {
  const getGraphText = useGetGraphText();
  return (
    <div>
      <ObsidianGraphClient text={getGraphText.value} isInteractive={false} />
    </div>
  );
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
