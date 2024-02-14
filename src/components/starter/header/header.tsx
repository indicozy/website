import { $, component$, useOn, useOnWindow, useSignal } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";

type TLink = { href: string; text: string };

const pages: TLink[] = [
  { href: "", text: "Works" },
  { href: "about", text: "About" },
  { href: "notes", text: "Notes" },
  { href: "mentorship", text: "Mentor" },
];

const HeaderItem = component$<{
  link: TLink;
}>(({ link: { href, text } }) => {
  const id = `radio-${href}`;
  const hrefAbsolute = `/${href}`;
  const url = useLocation();

  const checkedUrl = useSignal(`/${url.url.pathname.slice(1, -1)}`);
  const isChecked = checkedUrl.value === `/${href}`;

  return (
    <>
      <input type="radio" id={id} name="tabs" checked={isChecked} />
      <Link prefetch href={hrefAbsolute}>
        <label class={styles.tab} for={id}>
          {text}
        </label>
      </Link>
    </>
  );
});

// NOTE: Qwik does not support persisting state during route changes
const LinksHandler = component$<{ links: TLink[] }>(({ links }) => {
  const linksAggregate = links.map((l) => <HeaderItem key={l.href} link={l} />);
  const isOpaque = useSignal<boolean>(false);
  useOnWindow(
    "scroll",
    $(() => {
      isOpaque.value = window.scrollY > 50;
    })
  );
  useOn(
    "load",
    $(() => {
      isOpaque.value = window.scrollY > 50;
    })
  );
  return (
    <div class={[styles.tabs, isOpaque.value ? styles.tabs_opaque : null]}>
      {linksAggregate}
      <span class={styles.glider}></span>
    </div>
  );
});

export default component$(() => {
  return (
    <>
      <header class={styles.header}>
        <div class={styles.header_container}>
          <LinksHandler links={pages} />
        </div>
      </header>
      <div class={styles.header_fill}></div>
    </>
  );
});
