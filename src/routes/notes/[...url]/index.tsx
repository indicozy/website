import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { ObsidianPageBuilder } from "~/components/obsidian/ObsidianPageBuilder";

const lolBuilder = (url: string, str?: string) =>
  `${import.meta.env.PUBLIC_MARKDOWN_URL}${str ? "/" + str : ""}/${url}`;

const urlBuilder = (url: string, type: "md" | "gexf" | "nonMd" | "normal") => {
  if (type === "md") {
    return lolBuilder(url, "markdown");
  }
  if (type === "gexf") {
    return lolBuilder(url, "graph");
  }
  if (type === "nonMd") {
    return lolBuilder(url, "markdown");
  }
  return lolBuilder(url);
};

export const useGetGraphText = routeLoader$<{
  gexfText: string;
  htmlText: string;
}>(async (requestEvent) => {
  const { url } = requestEvent.params;
  const gexfLink = urlBuilder(url, "gexf");
  const gexfText = await fetch(gexfLink).then((res) => res.text());
  const htmlText = await fetch(urlBuilder(url, "md")).then((res) => res.text());

  return { gexfText, htmlText };
});

export default component$(() => {
  const getGraphText = useGetGraphText();
  const { gexfText, htmlText } = getGraphText.value;
  const loc = useLocation();
  const url = loc.params.url;
  console.log(url);
  return (
    <>
      <ObsidianPageBuilder url={url} htmlText={htmlText} graphText={gexfText} />
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
