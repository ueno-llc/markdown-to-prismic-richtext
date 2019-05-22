import { IRichTextSpan } from '../../types';
import { parseMarkdown } from '../parse-markdown';
import { transformChildren } from '../transform-children';

describe('transform children', () => {
  it('should generate children with correct offsets', () => {
    const markdownAst = parseMarkdown(`**he*l*lo**
    this is a 
    new 
    line`).children![0];

    const [spanNodes] = transformChildren(markdownAst, 0);

    expect(spanNodes.length).toBe(2);
    expect(spanNodes[0].type).toBe('strong');
    expect(spanNodes[1].type).toBe('em');
    expect((spanNodes[0] as IRichTextSpan).start).toBe(0);
    expect((spanNodes[0] as IRichTextSpan).end).toBe(5);
  });
});
