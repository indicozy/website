import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ObsidianGraphClient } from "~/components/obsidian/ObsidianGraph";

export const useGetGraphText = routeLoader$<string>(async () => {
  const url = "http://127.0.0.1:9000" + "/indicozy-obsidian/" + "graph.gexf";
  const gexfText = await fetch(url).then((res) => res.text());

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
