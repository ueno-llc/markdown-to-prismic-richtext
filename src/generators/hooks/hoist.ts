import { IRichTextBlock } from '../../types';

import { context } from './context';

export function hoist(node: IRichTextBlock) {
  context.hoisted.push(node);
}
