import { IMarkdownNode } from '../types';
import { runGenerator, blocks, spans } from './generators';
import { flatten } from 'lodash';

export const generateRichText = (rootNode: IMarkdownNode) =>
  flatten((rootNode.children || []).map(c => runGenerator(c, blocks)));
