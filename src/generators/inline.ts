import { first, last } from 'lodash';
import { extractText } from '../utils/extract-text';
import { IMarkdownNode, IRichTextSpan } from '../types';

export const inline = (type: string) => (node: IMarkdownNode): IRichTextSpan[] => {
  const [text, offsets] = extractText(node);

  const [start, _] = first(offsets)!;
  const [__, end] = last(offsets)!;

  return [
    {
      end,
      start,
      text,
      type,
    },
  ];
};
