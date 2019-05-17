import { RichTextSpan } from "prismic-richtext/src/richtext";
import { extractText } from "../utils/extract-text";
import { MarkdownNode } from "../types";
import { first, last } from "lodash"

export const element = (type: string) => (node: MarkdownNode): RichTextSpan[] => {
  const [text, offsets] = extractText(node);

  const [start, _] = first(offsets);
  const [__, end] = last(offsets);
 
  return [
    {
      type,
      text,
      start,
      end
    }
  ];
};
