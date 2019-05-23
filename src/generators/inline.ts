import { IMarkdownNode, IRichTextSpan } from '../types';
import { transformChildren } from '../utils/transform-children';
import { GenerationResult } from './generators';

export const inline = (type: string) => (node: IMarkdownNode, offset: number): GenerationResult<IRichTextSpan> => {
  const [spans, text, [start, end]] = transformChildren(node, offset);

  return [
    [
      {
        end,
        start,
        type,
      },
      ...spans,
    ],
    text,
    [start, end],
  ];
};
