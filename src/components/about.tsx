import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { aboutHandler } from "~/utils/about/aboutHandler";

export const AboutComponent = component$(() => {
  const markdownToHtml = useResource$(({ cleanup }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    cleanup(() => controller.abort());

    return aboutHandler(signal);
  });

  return (
    <Resource
      value={markdownToHtml}
      onPending={() => <div>Loading...</div>}
      onResolved={(data) => <>{JSON.stringify(data)}</>}
    />
  );
});
