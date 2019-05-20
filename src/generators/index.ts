import { IMarkdownNode } from '../types';
import { runGenerator, blocks } from './generators';
import { flatMap } from 'lodash';
import { reset } from './hooks/context';

export const generateRichText = (rootNode: IMarkdownNode) => {
  return flatMap(rootNode.children || [], c => {
    const context = reset();

    const result = runGenerator(c, blocks, blocks.paragraph);

    return [...context.hoisted, ...result];
  });
};
