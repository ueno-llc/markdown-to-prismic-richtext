import { MarkdownNode } from "../types";
import { runGenerator, blocks, spans } from "./generators";
import { flatten } from "lodash";

export const generateRichText = (rootNode: MarkdownNode) =>
  flatten(rootNode.children.map(c => runGenerator(c, blocks)));
