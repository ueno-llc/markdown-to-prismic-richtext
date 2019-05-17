import { MarkdownHeadingNode, RichTextBlock, MarkdownNode } from "../types";
import { extractText } from "../utils/extract-text";
import { reduceChildren } from "../utils/reduce-children";

export function generate(node: MarkdownNode): RichTextBlock[] {
  const headingNode = node as MarkdownHeadingNode;

  const [text, offsets] = extractText(node);

  const children = reduceChildren(node.children, offsets);

  return [
    {
      type: `heading${headingNode.depth}`,
      content: {
        text: text,
        spans: children
      }
    }
  ];
}
