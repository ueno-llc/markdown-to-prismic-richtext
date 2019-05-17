import { Parser } from 'remark-parse';
import { IMarkdownNode } from '../types';

export function parseMarkdown(md: string): IMarkdownNode {
  return new Parser(undefined, md).parse();
}
