import { MarkdownNode, RichTextSpan } from "../types";
import { Offset } from "./extract-text";
import { GeneratorFn, runGenerator, spans } from "../generators/generators";

/**
 * Turn span-level nodes into their prismic variants, with corrected offsets.
 *
 * @param children the span nodes belonging to a block, e.g. a paragraph or a list
 * @param offsets The actual character offsets of each span
 */
export function transformChildren(children: MarkdownNode[], offsets: Offset[]): RichTextSpan[] {
  return children
    .reduce((acc, child) => {
      const spanNodes = runGenerator(child, spans);

      spanNodes.forEach(span => ([span.start, span.end] = offsets.shift()));

      return acc.concat(spanNodes);
    }, [])
    .filter(x => x.type !== "text");
}
