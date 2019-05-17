import { IMarkdownNode, IRichTextSpan } from '../types';
import { extractText } from '../utils/extract-text';
import { first, last } from 'lodash';

interface IHyperlinkRichTextSpan extends IRichTextSpan {
  type: 'hyperlink';
  data: {
    url: string;
    preview: {
      title?: string;
    };
  };
}

export interface ILinkMarkdownNode extends IMarkdownNode {
  url: string;
  title: string | null;
}

export function generate(node: IMarkdownNode): IRichTextSpan[] {
  const linkNode = node as ILinkMarkdownNode;

  const [, offsets] = extractText(linkNode);

  const [start] = first(offsets)!;
  const [, end] = last(offsets)!;

  const hyperlink: IHyperlinkRichTextSpan = {
    type: 'hyperlink',
    start,
    end,
    data: {
      url: linkNode.url,
      preview: {
        title: linkNode.title ? linkNode.title : '',
      },
    },
  };

  return [hyperlink];
}
