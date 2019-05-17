import { convert } from "../index";
import { inspect } from "util";
import { Parser } from "remark-parse";
import { RichTextBlock, RichTextSpan } from "types";
import { parseMarkdown } from "../utils/parse-markdown";
import PrismicRichText from "prismic-richtext";

const markdown = `
 * This is 
 * an 
 * unordered
 * list
    `;

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
function expectBlock(
  blockNode: RichTextBlock | undefined,
  type: string,
  content: string,
  spansCount: number = 0
) {
  expect(blockNode).not.toBeNull();
  expect(blockNode.type).toBe(type);
  expect(blockNode!.text).toBe(content);
  expect(blockNode!.spans.length).toBe(spansCount);
}

function expectSpan(span: RichTextSpan, type: string, start: number, end: number, text?: string) {
  expect(span).not.toBeNull();
  expect(span.type).toBe(type);
  expect(span.end).toEqual(end);
  expect(span.start).toEqual(start);

  if (text) {
    expect(span.text).toBe(text);
  }
}

describe("convert", () => {
  it.skip("should convert", () => {
    const result = convert(markdown2);

    console.log(inspect(result, undefined, 20));
  });

  it("should convert strong", () => {
    const [block] = convert("he**l**lo");

    const strong = (block as RichTextBlock).spans[0] as RichTextSpan;

    expectSpan(strong, "strong", 2, 3, "l");
  });

  it("should convert em", () => {
    const [block] = convert("he*l*lo");

    const em = (block as RichTextBlock).spans[0] as RichTextSpan;

    expectSpan(em, "em", 2, 3, "l");
  });

  it("should convert link references", () => {
    const result = convert(`here is a [reference].
    
[reference]: http://definition.com`);

    const block = result[0] as RichTextBlock;
    const definitionBlock = result[1] as RichTextBlock;
    expectBlock(block, "paragraph", "here is a reference.", 1);
    expectBlock(definitionBlock, "paragraph", "reference: http://definition.com", 2);
  });

  it("should convert links with titles", () => {
    const result = convert('this is [hello](http://mbl.is "Mbl.is") a link');

    const pgblock = result[0] as RichTextBlock;

    expectBlock(pgblock, "paragraph", "this is hello a link", 1);
    expectSpan(pgblock.spans[0] as RichTextSpan, "hyperlink", 8, 13);
  });

  it("should convert bare links", () => {
    const result = convert(`http://mbl.is`);

    const pgblock = result[0] as RichTextBlock;

    expectBlock(pgblock, "paragraph", "http://mbl.is", 1);
    expectSpan(pgblock.spans[0] as RichTextSpan, "hyperlink", 0, 13);
  });

  it("should convert headings", () => {
    const result = convert(`# Hello`);

    const block = result[0] as RichTextBlock;

    expectBlock(block, "heading1", "Hello");
  });

  it("should convert paragraphs", () => {
    const content = `this is a paragraph`;
    const result = convert(content);
    const blockNode = result[0] as RichTextBlock;

    expectBlock(blockNode, "paragraph", content);
  });

  it("should convert ordered lists", () => {
    const result = convert(`
 1. this 
 2. **heckin** list
 3. is 
 4. totally
    ordered
    `);

    expectBlock(result[1], "o-list-item", "heckin list", 1);
    expect(result.length).toBe(4);
  });

  it("should convert unordered lists", () => {
    const result = convert(`
 * this 
 * **heckin** list
 * is 
 * totally
    ordered
    `);

    expectBlock(result[1], "list-item", "heckin list", 1);
    expect(result.length).toBe(4);
  });
});

describe("prismic compatibility", () => {
  it("should convert into something prismic can use", () => {
    const bla = convert(markdown2);

    PrismicRichText.asTree(bla);
  });
});
