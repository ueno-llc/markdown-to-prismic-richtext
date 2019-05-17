import { MarkdownNode, RichTextSpan, RichTextBlock, Position } from "../types";
import { extractText } from "../utils/extract-text";
import { element } from "./formatting-element";
import { generate as link, LinkMarkdownNode } from "./link";

interface DefinitionNode extends MarkdownNode {
  type: "definition";
  identifier: string;
  label: string;
  url: string;
  referenceType: string;
}

const position = {
  start: {
    offset: 0,
    column: 0,
    line: 0
  },
  end: {
    offset: 0,
    column: 0,
    line: 0
  }
};

export function generate(node: MarkdownNode): RichTextBlock[] {
  const refNode = node as DefinitionNode;

  const generateStrong = element("strong");

  const text = `${refNode.identifier}: ${refNode.url}`;

  // Prismic RichText has no support for in-document references, so
  // we fake it by adding a strong span, and a link span
  const definitionBlock: RichTextBlock = {
    type: "paragraph",
    content: {
      text,
      spans: [
        ...generateStrong({
          type: "strong",
          position,
          children: [],
          value: `${refNode.identifier}:`
        }),
        ...link({
          type: "link",
          title: refNode.label,
          url: refNode.url,
          value: refNode.url,
          position
        } as LinkMarkdownNode)
      ]
    }
  };

  return [definitionBlock];
}
