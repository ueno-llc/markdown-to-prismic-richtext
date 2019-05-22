import { IMarkdownNode, IRichTextSpan } from '../types';
import { runGenerator, spans, GenerationResult } from '../generators/generators';

export function transformChildren(children: IMarkdownNode[], offset: number): GenerationResult<IRichTextSpan> {
  return children.reduce<GenerationResult<IRichTextSpan>>(
    ([previousNodes, text, [, currentPosition]], child) => {
      const [spanNodes, nextText, [, end]] = runGenerator(child, spans, spans.text, currentPosition);

      return [[...previousNodes, ...spanNodes.filter(x => x.type !== 'text')], text + nextText, [offset, end]];
    },
    [[], '', [offset, offset]],
  );
}
