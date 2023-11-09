import { component$, useSignal } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";
import "./header.css";
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
  isChecked: boolean;
  onCheck$: (val: string) => void;
}>(({ link: { href, text }, isChecked, onCheck$ }) => {
  const id = `radio-${href}`;
  const hrefAbsolute = `/${href}`;

  return (
    <>
      <input type="radio" id={id} name="tabs" checked={isChecked} />
      <Link
        prefetch
        href={hrefAbsolute}
        class={isChecked ? `active` : ""}
        onClick$={() => onCheck$(hrefAbsolute)}
      >
        <label class="tab" for={id} onChange$={() => onCheck$(hrefAbsolute)}>
          {text}
        </label>
      </Link>
    </>
  );
});

// NOTE: Qwik does not support persisting state during route changes
const LinksHandler = component$<{ links: TLink[] }>(({ links }) => {
  const url = useLocation();
  const checkedUrl = useSignal(`/${url.url.pathname.slice(1, -1)}`);
  const linksAggregate = links.map((l) => (
    <HeaderItem
      key={l.href}
      link={l}
      isChecked={checkedUrl.value === `/${l.href}`}
      onCheck$={(val) => {
        console.log(val);
        checkedUrl.value = val;
      }}
    />
  ));
  const isOpaque = useSignal<boolean>(false); // TODO: bug, false if browser loaded from scrolled position
  return (
    <div
      document:onscroll$={() => {
        const y = window.scrollY;
        if (y > 100) {
          isOpaque.value = true;
        } else {
          isOpaque.value = false;
        }
      }}
      class={["tabs", isOpaque.value ? "opaque" : null]}
    >
      {linksAggregate}
      <span class="glider"></span>
    </div>
  );
});

export default component$(() => {
  return (
    <>
      <header>
        <div class={["header_container"]}>
          <LinksHandler links={pages} />
        </div>
      </header>
      <div class="header_fill"></div>
    </>
  );
});
