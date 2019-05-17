import { MarkdownNode, RichTextBlock } from "../types";
import { mergeParagraphs } from '../utils/merge-paragraphs'

interface ListMarkdownNode extends MarkdownNode {
  type: "list";
  ordered: boolean;
  start: number;
  spread: boolean;
}

export function generate(node: MarkdownNode): RichTextBlock[] {
  const listNode = node as ListMarkdownNode;

  const type = listNode.ordered ? "o-list-item" : "list-item";

  
  return listNode.children.map(item => {
    const merged = mergeParagraphs(item.children); 

    return {
      ...merged,
      type
    }
  });
}
