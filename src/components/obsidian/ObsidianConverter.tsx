import { Resource, component$, useResource$ } from "@builder.io/qwik";

export const HtmlStringToGraph = component$<{ data: string }>(({ data }) => {
  return <div dangerouslySetInnerHTML={data} />;
});

export const ObsidianConverter = component$<{ url: string }>(({ url }) => {
  const markdownToHtml = useResource$<string>(({ track, cleanup }) => {
    track(() => url);

    const controller = new AbortController();
    const signal = controller.signal;
    cleanup(() => controller.abort());

    return fetch(url, { signal }).then((res) => {
      console.log(res);
      return res.text();
    });
  });

  return (
    <Resource
      value={markdownToHtml}
      onPending={() => <div>Loading...</div>}
      onResolved={(data) => (
        <>
          <div>{url}</div>
          <HtmlStringToGraph data={data} />
        </>
      )}
    />
  );
});
