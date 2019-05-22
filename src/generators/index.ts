import { IMarkdownNode, IRichTextBlock } from '../types';
import { runGenerator, blocks } from './generators';
import { flatMap } from 'lodash';
import { reset } from './hooks/context';

export const generateRichText = (rootNode: IMarkdownNode) : IRichTextBlock[] => {
  return flatMap(rootNode.children || [], c => {
    const context = reset();

    const [result, _] = runGenerator(c, blocks, blocks.paragraph, 0);

    return [...context.hoisted, ...result];
  });
};
