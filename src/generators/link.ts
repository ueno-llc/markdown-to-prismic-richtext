import { IMarkdownNode, IRichTextSpan } from '../types';
import { transformChildren } from '../utils/transform-children';
import { GenerationResult } from './generators';

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

export function generate(node: IMarkdownNode, offset: number): GenerationResult<IRichTextSpan> {
  const linkNode = node as ILinkMarkdownNode;

  const [children, text, [start, end]] = transformChildren(linkNode.children || [], offset);

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

  return [[hyperlink, ...children], text, [start, end]];
}
