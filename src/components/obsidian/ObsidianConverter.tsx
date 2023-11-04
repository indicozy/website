import { component$ } from "@builder.io/qwik";

export const HtmlStringToGraph = component$<{ data: string }>(({ data }) => {
  return <div dangerouslySetInnerHTML={data} />;
});
