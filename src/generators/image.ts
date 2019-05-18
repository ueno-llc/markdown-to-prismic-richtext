import { IMarkdownNode, IRichTextBlock, IRichTextSpan } from 'types';
import { hoist } from './hooks/hoist';

export interface IImageBlock extends IRichTextBlock {
  type: 'image';
  data: {
    url: string;
  };
}

export interface IImageNode extends IMarkdownNode {
  url: string;
}

export function generate(node: IMarkdownNode): IRichTextSpan[] {
  const imgNode = node as IImageNode;
console.log(imgNode)
  hoist({
    type: 'image',
    text: '',
    data: {
      url: imgNode.url,
    },
  } as IImageBlock);

  return [];
}
