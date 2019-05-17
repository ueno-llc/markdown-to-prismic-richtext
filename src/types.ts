export type PrismicNode = RichTextBlock | RichTextSpan | null;

export interface Pos {
  line: number;
  column: number;
  offset: number;
}

export interface RichTextSpan {
  start: number;
  end: number;
  type: string;
  text?: string;
}

export interface RichTextBlock {
  type: string;
  content: {
    spans: RichTextSpan[];
    text: string;
  };
}

export interface Position {
  start: Pos;
  end: Pos;
}

export interface MarkdownHeadingNode extends MarkdownNode {
  type: "heading";
  depth: number;
}

export interface PrismicRootNode {
  rich: PrismicNode[];
  rich_TYPE: "StructuredText";
  rich_POSITION: number;
}

export interface MarkdownNode {
  type: string;
  value?: string;
  children?: MarkdownNode[];
  position: Position;
}
