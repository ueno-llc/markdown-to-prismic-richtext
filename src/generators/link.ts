import { MarkdownNode, RichTextSpan } from "../types";
import { extractText } from "../utils/extract-text";
import { first, last } from "lodash"

interface HyperlinkRichTextSpan extends RichTextSpan {
  type: "hyperlink",
  data: {
    url: string;
    preview: {
      title?: string;
    }
  }
}

export interface LinkMarkdownNode extends MarkdownNode {
  url: string;
  title: string | null; 
}

export function generate(node: MarkdownNode): RichTextSpan[] {
  
  const linkNode = node as LinkMarkdownNode;

  const [text, offsets] = extractText(linkNode); 

  const [start, _] = first(offsets);
  const [__, end] = last(offsets); 

  const hyperlink : HyperlinkRichTextSpan = {
    type: "hyperlink",
    start,
    end, 
    data: {
      url: linkNode.url,
      preview: {
        title: linkNode.title ? linkNode.title : ''
      }
    }
  }

  return [hyperlink]
}
