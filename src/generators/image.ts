import { IMarkdownNode, IRichTextBlock, IRichTextSpan } from 'types';
import { hoist } from './hooks/hoist';

export interface IImageBlock extends IRichTextBlock {
  type: 'image';
  url: string;
  title: string;
  alt: string;
  data: {
    origin: {
      url: string;
    };
    url: string;
  };
}

export interface IImageNode extends IMarkdownNode {
  title: string;
  alt: string;
  url: string;
}

export function generate(node: IMarkdownNode): IRichTextSpan[] {
  const imgNode = node as IImageNode;

  hoist({
    type: 'image',
    text: '',
    alt: imgNode.alt,
    title: imgNode.title,
    url: imgNode.url,
    data: {
      origin: {
        url: imgNode.url,
      },
      url: imgNode.url,
    },
  } as IImageBlock);

  return [];
}
