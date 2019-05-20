import { IMarkdownNode, PrismicNode } from 'types';

export function generate<T extends PrismicNode>(node: IMarkdownNode): T[] {
  return [];
}
