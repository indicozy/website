import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import showdown from "showdown";
import axios from "axios";
import { showdownExtensions } from "~/utils/markdown/markdownExtensions";

export const ObsidianConverter = component$<{ url: string }>(({ url }) => {
  const markdownToHtml = useSignal<string>();

  useTask$(async () => {
    await axios
      .get<string>(url)
      .then((res) => {
        const converter = new showdown.Converter({
          extensions: showdownExtensions,
        });

        const { data: text } = res;
        markdownToHtml.value = converter.makeHtml(text);
      })
      .catch(() => {
        markdownToHtml.value = "404 Not found";
      });
  });

  return <div dangerouslySetInnerHTML={markdownToHtml.value} />;
});
