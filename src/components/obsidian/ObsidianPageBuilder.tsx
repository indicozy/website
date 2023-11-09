import { component$ } from "@builder.io/qwik";
import { ObsidianGraphClient } from "./ObsidianGraph";
import { MarkdownToJsx } from "./ObsidianConverter";

export const ObsidianPageBuilder = component$<{
  url: string;
  graphText: string;
  htmlText: string;
}>(({ graphText, htmlText, url }) => {
  return (
    <>
      <ObsidianGraphClient key={url} text={graphText} isInteractive={true} />
      <MarkdownToJsx key={url} markdown={htmlText} />
    </>
  );
});
