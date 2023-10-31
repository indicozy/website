import { $, component$, useSignal } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";
import { toggleContact } from "~/components/contact";

type TLink = { href: string; text: string };

const pages: TLink[] = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/notes", text: "Notes" },
  { href: "/fun", text: "Fun" },
];

type TBackground = {
  width: number;
  height: number;
  left: number;
};

const HeaderItem = component$<{
  link: TLink;
  isActive: boolean;
}>(({ link: { href, text }, isActive }) => {
  // TODO: css is placeholder for the future CSS updates
  const container = useSignal<HTMLElement>();
  return (
    <li>
      <a ref={container} href={href} class={isActive ? `active` : ""}>
        {text}
      </a>
    </li>
  );
});

// NOTE: Qwik does not support persisting state during route changes
const LinksHandler = component$<{ links: TLink[] }>(({ links }) => {
  const fillProps = useSignal<TBackground>();
  const linksAggregate = links.map((l) => (
    <HeaderItem key={l.href} link={l} isActive={false} />
  ));
  // TODO: prefetching
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
