import { IMarkdownNode, IRichTextSpan } from '../types';
import { GenerationResult } from './generators';

export function generate(node: IMarkdownNode, offset: number): GenerationResult<IRichTextSpan> {
  const text = node.value || '';
  return [
    [
      {
        end: offset + text.length,
        start: offset,
        type: 'text',
      },
    ],
    text,
    [offset, offset + text.length],
  ];
}
