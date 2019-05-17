import { mergeParagraphs } from "../merge-paragraphs";
import { MarkdownNode } from "../../types";

const example = {
  type: "listItem",
  spread: true,

  children: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "Is\nwith ",
          position: {
            start: { line: 3, column: 5, offset: 14 },
            end: { line: 4, column: 10, offset: 26 }
          }
        },
        {
          type: "strong",
          children: [
            {
              type: "text",
              value: "many",
              position: {
                start: { line: 4, column: 12, offset: 28 },
                end: { line: 4, column: 16, offset: 32 }
              }
            }
          ],
          position: {
            start: { line: 4, column: 10, offset: 26 },
            end: { line: 4, column: 18, offset: 34 }
          }
        },
        {
          type: "text",
          value: " lines",
          position: {
            start: { line: 4, column: 18, offset: 34 },
            end: { line: 4, column: 24, offset: 40 }
          }
        }
      ],
      position: {
        start: { line: 3, column: 5, offset: 14 },
        end: { line: 4, column: 24, offset: 40 }
      }
    },
    {
      type: "paragraph",
      children: [
        {
          type: "emphasis",
          children: [
            {
              type: "text",
              value: "more",
              position: {
                start: { line: 6, column: 6, offset: 51 },
                end: { line: 6, column: 10, offset: 55 }
              }
            }
          ],
          position: {
            start: { line: 6, column: 5, offset: 50 },
            end: { line: 6, column: 11, offset: 56 }
          }
        },
        {
          type: "text",
          value: " lines",
          position: {
            start: { line: 6, column: 11, offset: 56 },
            end: { line: 6, column: 17, offset: 62 }
          }
        }
      ],
      position: {
        start: { line: 6, column: 5, offset: 50 },
        end: { line: 6, column: 17, offset: 62 }
      }
    }
  ],
  position: {
    start: { line: 3, column: 1, offset: 10 },
    end: { line: 6, column: 17, offset: 62 }
  }
};

describe("merge paragraphs", () => {
  it("should add line breaks between paragraphs", () => {
    const result = mergeParagraphs(example.children as MarkdownNode[]);
    
    expect(result.content.spans.length).toBe(2);
  });
});
