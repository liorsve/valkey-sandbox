import MarkdownIt from "markdown-it";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
import { full } from "markdown-it-emoji";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItHighlight from "markdown-it-highlightjs";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItTaskLists from "markdown-it-task-lists";
import MarkdownItTOC from "markdown-it-toc-done-right";
import DOMPurify from "dompurify";

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.headerLink({
      safariReaderFix: true,
    }),
  })
  .use(full)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlight)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTaskLists)
  .use(MarkdownItTOC);

export function renderMarkdown(content) {
  if (!content) return "";
  const html = markdown.render(content);
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "rel", "id"],
  });
}
