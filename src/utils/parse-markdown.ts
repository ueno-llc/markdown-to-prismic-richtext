import { Parser } from "remark-parse";
import { MarkdownNode } from "../types";

export function parseMarkdown(md: string): MarkdownNode {
  return new Parser(undefined, md).parse();
}
