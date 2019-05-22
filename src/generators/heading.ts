import { IMarkdownHeadingNode, IRichTextBlock, IMarkdownNode } from '../types';
import { transformChildren } from '../utils/transform-children';
import { GenerationResult } from './generators';

export function generate(node: IMarkdownNode, offset: number): GenerationResult<IRichTextBlock> {
  const headingNode = node as IMarkdownHeadingNode;

  const [spans, text, offsets] = transformChildren(node, offset);

  return [[
    { 
      type: `heading${headingNode.depth}`,
      text,
      spans
    },
  ], text, offsets];
}
