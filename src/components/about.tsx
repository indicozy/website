import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { aboutHandler } from "~/utils/about/aboutHandler";

export const AboutComponent = component$(() => {
  const lol = useSignal<any>({});
  useTask$(async () => {
    await aboutHandler().then((res) => (lol.value = res));
  });
  return <>{JSON.stringify(lol.value)}</>;
});
