// import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css'; // TODO: does it work?
// import { JSXNode, component$ } from "@builder.io/qwik";
// import { Link } from "@builder.io/qwik-city";

// const LinkStringToOrExcalidraw = component$<{ linkString: string }>(
//   ({ linkString }) => {
//     const hrefParamPattern = /<a[^>]*href="([^"]*)"[^>]*>/g;
//     const hrefParamMatch = linkString.match(hrefParamPattern);
//     if (hrefParamMatch === null || !hrefParamMatch[0]) throw Error("null");
//     const href = hrefParamMatch[0];

//     const patternInnerText = /<a[^>]*>(.*?)<\/a>/;
//     const matchInnerText = linkString.match(patternInnerText);

//     if (matchInnerText === null || !matchInnerText[1]) throw Error("null");
//     const innerText = matchInnerText[1];
//     // TODO: excalidraw to svg
//     // if(href)
//     return <Link href={href}>{innerText}</Link>;
//   }
// );

// TODO: finish that
// export const HtmlToJsx = component$<{ html: string }>(({ html }) => {
//   const aTagPattern = /<a[^>]*>.*?<\/a>/g;
//   const aTagMatches = html.matchAll(aTagPattern);
//   const htmlarr = html.split(aTagPattern);

//   const linkStrings = [...aTagMatches].map((l) => l[0]);
//   console.log(linkStrings);

//   const linksRecord = linkStrings.map((ls, index) => ({
//     key: ls,
//     obj: <LinkStringToOrExcalidraw key={index} linkString={ls} />,
//   }));
//   let htmlTemp: string = `${html}`;
//   const arr: JSXNode[] = [];

//   console.log(htmlTemp, "\n ENDDDDD \n\n\n");
//   for (const link of linksRecord) {
//     const temp = htmlTemp.split(link.key);
//     const jsxNode = htmlarr.shift();
//     if (jsxNode) {
//       arr.push(<div dangerouslySetInnerHTML={jsxNode} />);
//     }
//     arr.push(link.obj);
//     console.log(link.key, temp[1]);
//     // htmlTemp = temp[1]; // maybe check if empty
//   }

//   return (
//     <>
//       {/* <div>{html}</div>
//       <div>{linkStrings}</div> */}
//       <div>{arr}</div>
//     </>
//   );
// });
