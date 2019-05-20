import { IMarkdownNode, PrismicNode, IRichTextSpan, IRichTextBlock } from '../types';
import { generate as heading } from './heading';
import { generate as text } from './text';
import { generate as paragraph } from './paragraph';
import { generate as link } from './link';
import { generate as image } from './image';
import { generate as definition } from './definition';
import { generate as list } from './list';
import { generate as noop } from './noop';
import { block } from './block';
import { inline } from './inline';

export type GeneratorFn<T extends PrismicNode> = (node: IMarkdownNode) => T[];

export interface IGeneratorCollection<T extends PrismicNode> {
  [key: string]: GeneratorFn<T>;
}

export const blocks: IGeneratorCollection<IRichTextBlock> = {
  heading,
  paragraph,
  definition,

  code: block('preformatted'),
  list,
  html: noop,
  thematicBreak: noop,
};

export const spans: IGeneratorCollection<IRichTextSpan> = {
  text,
  image,
  html: noop,
  break: noop,
  listItem: text,
  inlineCode: inline('preformatted'),
  strong: inline('strong'),
  emphasis: inline('em'),
  link,
  linkReference: inline('strong'),
};

export function runGenerator<T extends PrismicNode>(
  node: IMarkdownNode,
  generators: { [key: string]: GeneratorFn<T> },
  defaultGenerator: GeneratorFn<T>,
): T[] {
  if (!generators[node.type]) {
    /* tslint:disable-next-line */
    console.warn(`No generator of type "${node.type}" found! Using text.`);
    return text(node) as T[];
  }

  return generators[node.type](node);
}
