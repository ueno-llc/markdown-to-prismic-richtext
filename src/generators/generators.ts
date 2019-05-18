import { IMarkdownNode, PrismicNode, IRichTextSpan, IRichTextBlock } from '../types';
import { generate as heading } from './heading';
import { generate as text } from './text';
import { generate as paragraph } from './paragraph';
import { generate as link } from './link';
import { generate as image } from './image';
import { generate as definition } from './definition';
import { generate as list } from './list';
import { element } from './formatting-element';

export type GeneratorFn<T extends PrismicNode> = (node: IMarkdownNode) => T[];

export interface IGeneratorCollection<T extends PrismicNode> {
  [key: string]: GeneratorFn<T>;
}

export const blocks: IGeneratorCollection<IRichTextBlock> = {
  heading,
  paragraph,
  definition,
  
  list,
};

export const spans: IGeneratorCollection<IRichTextSpan> = {
  text,
  image,
  strong: element('strong'),
  emphasis: element('em'),
  link,
  pre: element('preformatted'),
  linkReference: element('strong'),
};

export function runGenerator<T extends PrismicNode>(
  node: IMarkdownNode,
  generators: { [key: string]: GeneratorFn<T> },
): T[] {
  if (!generators[node.type]) {
    throw new Error(`No generator of type "${node.type}" found!`);
  }
  
  return generators[node.type](node);
}
