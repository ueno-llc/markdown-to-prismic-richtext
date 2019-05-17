import { extractText } from '../extract-text';
import { IMarkdownNode } from '../../types';

const createTextNode: (v: string, pos?: number) => IMarkdownNode = (v, pos = 0) => ({
  value: v,
  position: { end: { column: 1, line: 1, offset: pos + 1 }, start: { offset: pos, column: 1, line: 1 } },
  type: 'text',
});

const createBlockNode: (children: IMarkdownNode[]) => IMarkdownNode = children => ({
  children,
  type: 'paragraph',
  position: { end: { column: 1, line: 1, offset: 0 }, start: { offset: 12, column: 1, line: 1 } },
});

const b: (v: string) => IMarkdownNode = v => createBlockNode(t(v));
const t: (v: string) => IMarkdownNode[] = (v: string) => v.split('').map(createTextNode);

describe('extract-text', () => {
  it('should extract text from a flat node array', () => {
    const [value, _] = extractText(b('hello'));

    expect(value).toBe('hello');
  });

  it('should extract text from a nested node array', () => {
    const nodes = createBlockNode([b('hello'), createTextNode(' '), ...t('world')]);

    const [text, _] = extractText(nodes);
    expect(text).toBe('hello world');
  });

  it('should extract text from a single value node', () => {
    const [textNode, [[start, end]]] = extractText(createTextNode('hello'));
    expect(textNode).toBe('hello');
    expect(start).toEqual(0);
    expect(end).toEqual(5);
  });
});
