/* 
This file has extensions for showdown, made for integration with Obsidian
 */

// [[url name | text]] -> <a>
export const myext1 = {
  type: "lang",
  filter: (markdownText: string) => {
    /// made by ChatGPT
    const linkRegex = /\[\[([^\]]+)\|([^\]]+)\]\]/g;

    // Replace Markdown links with HTML <a> tags
    const htmlText = markdownText.replace(
      linkRegex,
      '<a href="/notes/$1">$2</a>'
    );
    return htmlText;
  },
};

// [[text]] -> <i>
export const myext2 = {
  type: "lang",
  filter: (markdownText: string) => {
    /// made by ChatGPT
    const linkRegex = /\[\[([^\]]+)\]\]/g;

    // Replace Markdown links with HTML <a> tags
    const htmlText = markdownText.replace(linkRegex, "<i>$1</i>");
    return htmlText;
  },
};

export const showdownExtensions = [myext1, myext2];
