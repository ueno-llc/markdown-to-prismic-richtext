import { MarkdownNode, RichTextBlock, RichTextSpan } from "../types";
import { extractText } from "../utils/extract-text";
import { transformChildren } from "../utils/transform-children";

export function generate(node: MarkdownNode): RichTextBlock[] {
  const [text, offsets] = extractText(node);

  const children = transformChildren(node.children || [], offsets);

  return [
    {
      type: "paragraph",

      text,
      spans: children
    }
  ];
}
