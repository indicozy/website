import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ObsidianGraph } from "~/components/obsidian/ObsidianGraph";

export default component$(() => {
  return (
    <div>
      notes
      <ObsidianGraph />
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
