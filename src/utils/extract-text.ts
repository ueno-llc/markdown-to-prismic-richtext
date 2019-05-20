import { IMarkdownNode } from '../types';

export type Offset = [number, number];

export type NodeValue = [string, string];

const TO_EXCLUDE = ['html', 'break', 'thematicBreak'];

export function extractText(node: IMarkdownNode): [string, Offset[], NodeValue[]] {
  let accumulator = '';

  let queue: IMarkdownNode[] = [node];

  const offsets: Offset[] = [];
  const nodes: NodeValue[] = [];

  while (queue.length) {
    const curr = queue.shift()!;

    if (TO_EXCLUDE.some(x => x === curr.type)) {
      continue;
    }

    if (curr.value) {
      offsets.push([accumulator.length, accumulator.length + curr.value.length]);
      nodes.push([curr.type, curr.value]);
      accumulator += curr.value;
    }

    if (curr.children) {
      queue = [...curr.children, ...queue];
    }
  }

  return [accumulator, offsets, nodes];
}
