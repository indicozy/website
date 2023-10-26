import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { ObsidianConverter } from "~/components/ObsidianConverter";

export default component$(() => {
  const loc = useLocation();
  const url = loc.params.url;
  return (
    <>
      {/* {JSON.stringify(`${import.meta.env.PUBLIC_MARKDOWN_URL}/${url}`)} */}
      <ObsidianConverter
        url={`${import.meta.env.PUBLIC_MARKDOWN_URL}/${url}`}
      />
    </>
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
