import { IMarkdownNode, IRichTextBlock } from '../types';
import { mergeParagraphs } from '../utils/merge-paragraphs';
import { GenerationResult } from './generators';

interface IListMarkdownNode extends IMarkdownNode {
  type: 'list';
  ordered: boolean;
  start: number;
  spread: boolean;
}

export function generate(node: IMarkdownNode, offset: number): GenerationResult<IRichTextBlock> {
  const listNode = node as IListMarkdownNode;

  const type = listNode.ordered ? 'o-list-item' : 'list-item';

  return [
    (listNode.children || []).map(item => {
      const merged = mergeParagraphs(item.children || []);

      return {
        ...merged,
        type,
      };
    }),
    "",
    [offset, offset],
  ];
}
