import convert from '../index';
import { RichText as PrismicRichText } from 'prismic-dom';
import { IRichTextBlock, IRichTextSpan, IMarkdownNode } from '../types';
import { inspect } from 'util';
import { parseMarkdown } from '../utils/parse-markdown';
import { runGenerator, spans } from '../generators/generators';

const markdown2 = `
# Hello

Let me tell you about this **project**. It should turn *markdown* into prismic richtext...

..for the most part.

## Chapter 2 

Lorem ipsum
dolor
sit amet

 2. This
 3. Is
    with **many** lines
    
    *more* lines
 4. an
 5. Ordered.
 6. List
`;
function expectBlock(blockNode: IRichTextBlock | undefined, type: string, content: string, spansCount: number = 0) {
  expect(blockNode).not.toBeNull();
  expect(blockNode!.type).toBe(type);
  expect(blockNode!.content.text).toBe(content);
  expect(blockNode!.content.spans.length).toBe(spansCount);
}

function expectSpan(span: IRichTextSpan, type: string, start: number, end: number) {
  expect(span).not.toBeNull();
  expect(span.type).toBe(type);
  expect(span.end).toEqual(end);
  expect(span.start).toEqual(start);
}

function expectPrismic(blocks: IRichTextBlock[]) {
  const mapped = blocks.map(({ type, content: { spans, text } }) => ({ type, spans, text }));
  PrismicRichText.asHtml(mapped);
}

describe('convert', () => {
  it('should convert strong', () => {
    const result = convert('he**l**lo');

    const strong = result[0].content.spans[0];

    expectSpan(strong, 'strong', 2, 3);
    expectPrismic(result);
  });

  it('should convert em', () => {
    const result = convert('he*l*lo');

    const em = result[0].content.spans[0];

    expectSpan(em, 'em', 2, 3);
    expectPrismic(result);
  });

  it('should convert links with titles', () => {
    const result = convert('this is [hello](http://mbl.is "Mbl.is") a link');

    const pgblock = result[0];

    expectBlock(pgblock, 'paragraph', 'this is hello a link', 1);
    expectSpan(pgblock.content.spans[0], 'hyperlink', 8, 13);
    expectPrismic(result);
  });

  it('should convert bare links', () => {
    const result = convert(`http://mbl.is`);

    const pgblock = result[0];

    expectBlock(pgblock, 'paragraph', 'http://mbl.is', 1);
    expectSpan(pgblock.content.spans[0], 'hyperlink', 0, 13);
    expectPrismic(result);
  });

  it('should convert headings', () => {
    const result = convert(`# Hello`);

    expectBlock(result[0], 'heading1', 'Hello');
    expectPrismic(result);
  });

  it('should convert paragraphs', () => {
    const content = `this is a paragraph`;
    const result = convert(content);
    expectBlock(result[0], 'paragraph', content);
    expectPrismic(result);
  });

  it('should convert images', () => {
    const result = convert(
      `![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")`,
    );
  });

  it('should convert ordered lists', () => {
    const result = convert(`
 1. this 
 2. **heckin** list
 3. is 
 4. totally
    ordered
    `);

    expectBlock(result[1], 'o-list-item', 'heckin list', 1);
    expect(result.length).toBe(4);
    expectPrismic(result);
  });

  it('should convert unordered lists', () => {
    const result = convert(`
 * this 
 * **heckin** list
 * is 
 * totally
   unordered
    `);

    expectBlock(result[1], 'list-item', 'heckin list', 1);
    expect(result.length).toBe(4);
    expectPrismic(result);
  });

  it('should convert preformatted text', () => {
    const content = `"

    function main() {
      log("whoo");
    }

\`\`\`
this is a 
preformatted
block
\`\`\`

this is \`an inline code\` example
    `;

    const result = convert(content);

    expectPrismic(result);
  });

  it('should remove HTML tags from slices', () => {
    const content = `this is <br> some text <br />`;

    const result = convert(content);

    expect(result[0]!.content.text).toBe('this is  some text ');
  });

  it('should convert formatted links', () => {
    const content = '[This is some **li*i*k** text](https://mbl.is)';

    const [
      {
        content: { spans, text },
      },
    ] = convert(content);

    expect(text).toBe('This is some liik text');
    expect(spans.length).toBe(3);

    expect(spans.find(x => x.type === 'strong')).toMatchObject({
      type: 'strong',
      start: 13,
      end: 17,
    });

    expect(spans.find(x => x.type === 'em')).toMatchObject({
      type: 'em',
      start: 15,
      end: 16,
    });

    expect(spans.find(l => l.type === 'hyperlink')).toMatchObject({
      type: 'hyperlink',
      start: 0,
      end: 22,
      data: {
        url: 'https://mbl.is',
        preview: {
          title: '',
        },
      },
    });
  });

  it('should have correct offsets for links', () => {
    const content = 'Text before [some link **text**](https://mbl.is)';

    const [block] = convert(content);

    expectBlock(block, 'paragraph', 'Text before some link text', 2);

    expectSpan(block.content.spans.find(x => x.type === 'strong')!, 'strong', 22, 26);

    expectSpan(block.content.spans.find(x => x.type === 'hyperlink')!, 'hyperlink', 12, 26);
  });

  it('should support image links', () => {
    const c = '[![Image title](https://placehold.it/128x128) should I add **more** text](https://mbl.is)';

    const result = convert(c);
  });
});

describe('runGenerator', () => {
  it('should run a default generator when given unknown type', () => {
    const node: IMarkdownNode = {
      type: 'foo',
      position: {
        end: { column: 0, line: 0, offset: 3 },
        start: { column: 0, line: 0, offset: 0 },
      },
      value: 'foo',
    };

    const mock = jest.fn();

    runGenerator(node, spans, mock as any, 0);
    expect(mock).toBeCalledWith(node, 0);
  });
});

describe('prismic compatibility', () => {
  it('should convert into something prismic can use', () => {
    const bla = convert(markdown2);

    expectPrismic(bla);
  });
});
