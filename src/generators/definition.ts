import { IMarkdownNode, IRichTextBlock } from '../types';
import { element } from './formatting-element';
import { generate as link, ILinkMarkdownNode } from './link';

interface IDefinitionNode extends IMarkdownNode {
  identifier: string;
  label: string;
  referenceType: string;
  type: 'definition';
  url: string;
}

const position = {
  end: {
    column: 0,
    line: 0,
    offset: 0,
  },
  start: {
    column: 0,
    line: 0,
    offset: 0,
  },
};

export function generate(node: IMarkdownNode): IRichTextBlock[] {
  const refNode = node as IDefinitionNode;

  const generateStrong = element('strong');

  const text = `${refNode.identifier}: ${refNode.url}`;

  // Prismic RichText has no support for in-document references, so
  // we fake it by adding a strong span, and a link span
  const definitionBlock: IRichTextBlock = {
    spans: [
      ...generateStrong({
        children: [],
        position,
        type: 'strong',
        value: `${refNode.identifier}:`,
      }),
      ...link({
        position,
        title: refNode.label,
        type: 'link',
        url: refNode.url,
        value: refNode.url,
      } as ILinkMarkdownNode),
    ],
    text,
    type: 'paragraph',
  };

  return [definitionBlock];
}
