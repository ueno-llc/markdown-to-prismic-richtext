import { IMarkdownNode, IRichTextSpan } from '../types';
import { GenerationResult } from './generators';

export function generate(node: IMarkdownNode, offset: number): GenerationResult<IRichTextSpan> {
  return [
    [
      {
        end: offset + node.value!.length,
        start: offset,
        text: node.value,
        type: 'text',
      },
    ],
    node.value || '',
    [offset, offset + node.value!.length],
  ];
}
