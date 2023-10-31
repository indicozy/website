import { Resource, component$, useResource$ } from "@builder.io/qwik";
import showdown from "showdown";
import { showdownExtensions } from "~/utils/markdown/markdownExtensions";

export const ObsidianConverter = component$<{ url: string }>(({ url }) => {
  const markdownToHtml = useResource$<string>(({ track, cleanup }) => {
    track(() => url);

    const controller = new AbortController();
    const signal = controller.signal;
    cleanup(() => controller.abort());

    return fetch(url, { signal })
      .catch((err) => {
        console.log(err, err?.cause?.errors);
        throw err;
      })
      .then((res) => res.text())
      .then((text) => {
        const converter = new showdown.Converter({
          extensions: showdownExtensions,
        });
        return converter.makeHtml(text);
      });
  });

  return (
    <Resource
      value={markdownToHtml}
      onPending={() => <div>Loading...</div>}
      onResolved={(data) => <div dangerouslySetInnerHTML={data} />}
    />
  );
});
