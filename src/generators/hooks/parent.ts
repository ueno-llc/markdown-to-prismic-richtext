import { IMarkdownNode } from "types";

import { context } from "./context"; 
import { last } from "lodash";

export function useParent() : IMarkdownNode {
  return last(context.parents)!;
}

export function popParent() : void {
  context.parents.pop();
}

export function pushParent(parent: IMarkdownNode) {
  context.parents.push(parent); 
}