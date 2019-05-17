import { IMarkdownNode, IRichTextSpan } from '../types';

export function generate(node: IMarkdownNode): IRichTextSpan[] {
  return [
    {
      end: node.position!.end.offset,
      start: node.position!.start.offset,
      text: node.value,
      type: 'text',
    },
  ];
}
