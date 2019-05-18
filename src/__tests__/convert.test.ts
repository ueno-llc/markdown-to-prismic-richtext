import { convert } from '../index';
import * as PrismicRichText from 'prismic-richtext';
import { IRichTextBlock, IRichTextSpan } from '../types';

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
  expect(blockNode!.text).toBe(content);
  expect(blockNode!.spans.length).toBe(spansCount);
}

function expectSpan(span: IRichTextSpan, type: string, start: number, end: number, text?: string) {
  expect(span).not.toBeNull();
  expect(span.type).toBe(type);
  expect(span.end).toEqual(end);
  expect(span.start).toEqual(start);

  if (text) {
    expect(span.text).toBe(text);
  }
}

function expectPrismic(blocks: IRichTextBlock[]) {
  PrismicRichText.asTree(blocks);
}

describe('convert', () => {
  it.skip('should convert', () => {
    const result = convert(markdown2);
    expectPrismic(result);
  });

  it('should convert strong', () => {
    const result = convert('he**l**lo');

    const strong = result[0].spans[0];

    expectSpan(strong, 'strong', 2, 3, 'l');
    expectPrismic(result);
  });

  it('should convert em', () => {
    const result = convert('he*l*lo');

    const em = result[0].spans[0];

    expectSpan(em, 'em', 2, 3, 'l');
    expectPrismic(result);
  });

  it('should convert link references', () => {
    const result = convert(`here is a [reference].
    
[reference]: http://definition.com`);

    const block = result[0];
    const definitionBlock = result[1];
    expectBlock(block, 'paragraph', 'here is a reference.', 1);
    expectBlock(definitionBlock, 'paragraph', 'reference: http://definition.com', 2);
    expectPrismic(result);
  });

  it('should convert links with titles', () => {
    const result = convert('this is [hello](http://mbl.is "Mbl.is") a link');

    const pgblock = result[0];

    expectBlock(pgblock, 'paragraph', 'this is hello a link', 1);
    expectSpan(pgblock.spans[0], 'hyperlink', 8, 13);
    expectPrismic(result);
  });

  it('should convert bare links', () => {
    const result = convert(`http://mbl.is`);

    const pgblock = result[0];

    expectBlock(pgblock, 'paragraph', 'http://mbl.is', 1);
    expectSpan(pgblock.spans[0], 'hyperlink', 0, 13);
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
    expectPrismic(result)
  });

  it('should convert images', () => {
    const result = convert(
      `![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")`,
    );

    console.log(result);
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
});

describe('prismic compatibility', () => {
  it('should convert into something prismic can use', () => {
    const bla = convert(markdown2);

    PrismicRichText.asTree(bla);
  });
});
