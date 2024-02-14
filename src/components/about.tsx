import { component$ } from "@builder.io/qwik";
import { type aboutHandler } from "~/utils/about/aboutHandler";

// const aqiUsEmoji = (aqi: number) => {
//   if (aqi < 50) return "️😊";
//   if (aqi < 100) return "🙃";
//   if (aqi < 150) return "🫤";
//   if (aqi < 200) return "😷";
//   if (aqi < 300) return "😥";
//   return "💀";
// };

const StatsSection = component$(() => {
  // const star = ["frontend", "backend", "devops"];
  return <></>;
});

export const AboutComponent = component$<{
  data: Awaited<ReturnType<typeof aboutHandler>>;
}>(({ data }) => {
  return (
    <>
      <section>
        <h1>I'm Berkut.</h1>
        <p>
          FullStack Developer working remotely from{" "}
          {data.github.location}. Air
          {/* quality is {data.aqi.data.current?.pollution.aqius} AQI{" "}
          {data.aqi.data.current ? aqiUsEmoji(data.aqi.data.current.pollution.aqius) : ""}. */}
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
  );
});
