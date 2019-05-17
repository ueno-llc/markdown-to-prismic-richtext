import { MarkdownNode, RichTextSpan } from "../../types";
import { parseMarkdown } from "../parse-markdown";
import { extractText } from "../extract-text";
import { transformChildren } from "../transform-children";

describe("transform children", () => {
  it("should generate children with correct offsets", () => {
    const markdownAst = parseMarkdown(`he**l**lo
    this is a 
    new 
    line`).children![0];

    const [_, offsets] = extractText(markdownAst);

    const spanNodes = transformChildren(markdownAst.children!, offsets);

    expect(spanNodes.length).toBe(1);
    expect(spanNodes[0].type).toBe("strong");
    expect((spanNodes[0] as RichTextSpan).start).toBe(2);
    expect((spanNodes[0] as RichTextSpan).end).toBe(3);
  });
});
