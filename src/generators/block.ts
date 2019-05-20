import { IMarkdownNode, IRichTextBlock } from 'types';
import { extractText } from '../utils/extract-text';
import { transformChildren } from '../utils/transform-children';

export const block = (type: string) => (node: IMarkdownNode): IRichTextBlock[] => {
  const [text, offsets] = extractText(node);

  const spans = transformChildren(node.children || [], offsets);

  return [
    {
      type,
      text,
      spans,
    },
  ];
};
