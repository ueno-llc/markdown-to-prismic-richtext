import { IMarkdownNode, PrismicNode } from 'types';
import { GenerationResult } from './generators';

export function generate<T extends PrismicNode>(node: IMarkdownNode, offset: number): GenerationResult<T> {
  return [[], '', [offset, offset]];
}
