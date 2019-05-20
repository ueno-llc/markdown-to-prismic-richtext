import { IRichTextBlock } from 'types';

interface IContext {
  hoisted: IRichTextBlock[];
}

export let context = reset();

export function reset(): IContext {
  context = {
    hoisted: [],
  };

  return context;
}
