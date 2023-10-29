import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";
import { toggleContact } from "~/components/contact";

type TLink = { href: string; text: string };

const pages: TLink[] = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/fun", text: "Fun" },
];

type TBackground = {
  width: number;
  height: number;
  left: number;
};

const HeaderItem = component$<{
  link: TLink;
  onClickQrl: PropFunction<(prop: TBackground) => void>;
}>(({ link: { href, text } }) => {
  const container = useSignal<HTMLElement>();
  return (
    <li
      onClick$={() => {
        if (container.value !== undefined) {
          console.log({ width: container.value.offsetHeight });
        }
        // onClick({ width: 10, height: 10, left: 0 })
      }}
    >
      <a ref={container} href={href}>
        {text}
      </a>
    </li>
  );
});

const LinksHandler = component$<{ links: TLink[] }>(({ links }) => {
  const fillProps = useSignal<TBackground>();
  const callbackQrl = $(() => {
    console.log("works");
  });
  const linksAggregate = links.map((l) => (
    <HeaderItem onClickQrl={callbackQrl} key={l.href} link={l} />
  ));
  // TODO prefetching
  return (
    <>
      <ul>
        {linksAggregate}
        <button onClick$={$(toggleContact)}>Contact</button>
      </ul>
      <div style={fillProps.value}> background </div>
    </>
  );
});

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </a>
        </div>
        <LinksHandler links={pages} />
      </div>
    </header>
  );
});
