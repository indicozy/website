import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { aboutHandler } from "~/utils/about/aboutHandler";

const aqiUsEmoji = (aqi: number) => {
  if (aqi < 50) return "☺️";
  if (aqi < 100) return "🙃";
  if (aqi < 150) return "🫤";
  if (aqi < 200) return "😷";
  if (aqi < 300) return "😥";
  return "💀";
};

const StatsSection = component$(() => {
  const star = ["frontend", "backend", "devops"];
  return <></>;
});

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
      onResolved={(data) => (
        <>
          <section>
            <h1>I'm Berkut.</h1>
            <p>
              FullStack Developer working remotely from{" "}
              {data.aqi.data.current.weather.tp}°C {data.github.location}. Air
              quality is {data.aqi.data.current.pollution.aqius} AQI{" "}
              {aqiUsEmoji(data.aqi.data.current.pollution.aqius)}.
            </p>
            <p>Working for 1.5 years, I've wo</p>
            <div>
              <p>GitHub image</p>
              <p>Bio from GitHub:</p>
              <p>{data.github.bio}</p>
            </div>
          </section>
          <StatsSection />
          <section>
            <h2>Let's collaborate if you're committed to education.</h2>
          </section>
        </>
      )}
    />
  );
});
