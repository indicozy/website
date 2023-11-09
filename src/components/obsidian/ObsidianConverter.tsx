import { component$ } from "@builder.io/qwik";
// import { HtmlToJsx } from "./getJsx";
import { convertMarkdownToHtml } from "~/utils/markdown/getHtml";

export const HtmlStringToGraph = component$<{ html: string }>(({ html }) => {
  return <div dangerouslySetInnerHTML={html} />;
});

export const MarkdownToJsx = component$<{ markdown: string }>(
  ({ markdown }) => {
    const html = convertMarkdownToHtml(markdown);
    return (
      <>
        <HtmlStringToGraph html={html} />
      </>
    );
  }
);
