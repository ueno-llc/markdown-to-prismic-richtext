import { MarkdownNode, RichTextBlock, RichTextSpan } from "../types";
import { extractText } from "../utils/extract-text";
import { reduceChildren } from "../utils/reduce-children";

export function generate(node: MarkdownNode): RichTextBlock[] {
  const [text, offsets] = extractText(node);

  const children = reduceChildren(node.children || [], offsets);

  return [
    {
      type: "paragraph",
      content: {
        text,
        spans: children
      }
    }
  ];
}
