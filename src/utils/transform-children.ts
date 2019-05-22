import { IMarkdownNode, IRichTextSpan } from '../types';
import { runGenerator, spans, GenerationResult } from '../generators/generators';
import { pushParent, popParent } from '../generators/hooks/parent';

export function _transformChildren(children: IMarkdownNode[], offset: number): GenerationResult<IRichTextSpan> {
  return children.reduce<GenerationResult<IRichTextSpan>>(
    ([previousNodes, text, [, currentPosition]], child) => {
      const [spanNodes, nextText, [, end]] = runGenerator(child, spans, spans.text, currentPosition);

      return [[...previousNodes, ...spanNodes.filter(x => x.type !== 'text')], text + nextText, [offset, end]];
    },
    [[], '', [offset, offset]],
  );
}

export function transformChildren(parent: IMarkdownNode, offset: number): GenerationResult<IRichTextSpan> {
  pushParent(parent);
  const result = _transformChildren(parent.children || [], offset);
  popParent();

  return result;
}
