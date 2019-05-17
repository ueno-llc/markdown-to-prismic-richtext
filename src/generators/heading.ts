import { MarkdownHeadingNode, RichTextBlock, MarkdownNode } from "../types";
import { extractText } from "../utils/extract-text";
import { transformChildren } from "../utils/transform-children";

export function generate(node: MarkdownNode): RichTextBlock[] {
  const headingNode = node as MarkdownHeadingNode;

  const [text, offsets] = extractText(node);

  const children = transformChildren(node.children, offsets);

  return [
    {
      type: `heading${headingNode.depth}`,

      text: text,
      spans: children
    }
  ];
}
