import { convert } from "../index";
import { inspect } from "util";
import { Parser } from "remark-parse";
import { RichTextBlock, RichTextSpan } from "types";

const markdown = `
# he**l**lo

This is a markdown file with **some** parahraphs

 * And some
 * Lines
 * of bulletins

Wow, and maybe a [link](http://mbl.is) of some sort
    `;

function expectBlock(
  blockNode: RichTextBlock | undefined,
  type: string,
  content: string,
  spansCount: number = 0
) {
  expect(blockNode).not.toBeNull();
  expect(blockNode.type).toBe(type);
  expect(blockNode!.content.text).toBe(content);
  expect(blockNode!.content.spans.length).toBe(spansCount);
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
    const result = convert(markdown);

    //  console.log(result);
  });

  it("should have correct span offsets", () => {
    const [ block ] = convert('he**l**lo');
    
    const strong = (block as RichTextBlock).content.spans[0] as RichTextSpan;

    expectSpan(strong, "strong", 2, 3, "l");
  })

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
});

describe("prismic", () => {
  it("should prismic", () => {});
});
