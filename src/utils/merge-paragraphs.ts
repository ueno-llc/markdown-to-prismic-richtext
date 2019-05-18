import { IMarkdownNode, IRichTextBlock, IPosition } from '../types';
import { repeat, flatten } from 'lodash';
import { extractText } from './extract-text';
import { transformChildren } from './transform-children';

function intersperse<T>(arr: T[], elementFn: (left: T, right: T) => T) {
  return arr.reduce<T[]>((acc, current, i) => {
    const last = i === arr.length - 1;

    return [...acc, current, ...(last ? [] : [elementFn(current, arr[i + 1])])];
  }, []);
}

export function mergeParagraphs(paragraphs: IMarkdownNode[]): IRichTextBlock {
  const paragraphsWithLinebreaks = intersperse(paragraphs, (left, right) => {
    const linebreaks = right.position!.start.line - left.position!.end.line;

    const position = makePosition(left.position!.end.line, right.position!.end.line);

    return {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: repeat('\n', linebreaks),
          position,
        },
      ],
      position,
    };
  });

  const [text, offsets] = extractText({
    children: paragraphsWithLinebreaks,
    type: 'root',
  });

  const allChildren = flatten(paragraphsWithLinebreaks.map(x => x.children || []));

  const transformed = transformChildren(allChildren, offsets);

  return {
    type: 'paragraph',

    spans: transformed,
    text,
  };
}

function makePosition(top: number, bottom: number): IPosition {
  return {
    start: { line: top, offset: 0, column: 0 },
    end: { line: bottom, offset: 0, column: 0 },
  };
}
