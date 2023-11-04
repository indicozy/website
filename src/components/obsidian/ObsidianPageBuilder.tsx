import { component$ } from "@builder.io/qwik";
import { ObsidianGraphClient } from "./ObsidianGraph";
import { HtmlStringToGraph } from "./ObsidianConverter";

export const ObsidianPageBuilder = component$<{
  url: string;
  graphText: string;
  htmlText: string;
}>(({ graphText, htmlText, url }) => {
  return (
    <>
      <ObsidianGraphClient key={url} text={graphText} isInteractive={true} />
      <HtmlStringToGraph key={url} data={htmlText} />
    </>
  );
});
