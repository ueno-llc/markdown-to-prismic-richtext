import { IRichTextBlock, IMarkdownNode } from 'types';

interface IContext {
  hoisted: IRichTextBlock[];
  parents: IMarkdownNode[];
}

export let context = reset();

export function reset(): IContext {
  context = {
    hoisted: [],
    parents: []
  };

  return context;
}
