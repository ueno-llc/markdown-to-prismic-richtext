import { IMarkdownNode, IRichTextBlock, IRichTextSpan } from 'types';
import { hoist } from './hooks/hoist';
import { GenerationResult } from './generators';
import { generate as noop } from './noop';
import { useParent } from './hooks/parent';
import { ILinkMarkdownNode } from './link';

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
    linkTo?: {
      url: string;
      preview: {
        title: string;
      };
    };
  };
}

export interface IImageNode extends IMarkdownNode {
  title: string;
  alt: string;
  url: string;
}

export function generate(node: IMarkdownNode, offset: number): GenerationResult<IRichTextSpan> {
  const imgNode = node as IImageNode;
  
  const parent = useParent();

  const image: IImageBlock = {
    type: 'image',
    text: '',
    spans: [],
    alt: imgNode.alt,
    title: imgNode.title,
    url: imgNode.url,
    data: {
      origin: {
        url: imgNode.url,
      },
      url: imgNode.url,
    },
  };

  if (parent.type === 'link') {
    const linkNode = parent as ILinkMarkdownNode;

    image.data.linkTo = {
      url: linkNode.url,
      preview: {
        title: linkNode.url,
      },
    };
  }

  hoist(image);

  return noop(node, offset);
}
