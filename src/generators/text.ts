import { MarkdownNode, RichTextSpan } from "../types";


export function generate(node: MarkdownNode): RichTextSpan[] {
  
  return [{
    end: node.position.end.offset,
    start: node.position.start.offset,
    text: node.value,
    type: "text"  
  }];
}
