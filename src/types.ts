export type PrismicNode = IRichTextBlock | IRichTextSpan | null;

export interface IPos {
  line: number;
  column: number;
  offset: number;
}

export interface IRichTextSpan {
  start: number;
  end: number;
  type: string;
  text?: string;
}

export interface IRichTextBlock {
  type: string;
  spans: IRichTextSpan[];
  text: string;
}

export interface IPosition {
  start: IPos;
  end: IPos;
}

export interface IMarkdownHeadingNode extends IMarkdownNode {
  type: 'heading';
  depth: number;
}

export interface IMarkdownNode {
  type: string;
  value?: string;
  children?: IMarkdownNode[];
  position?: IPosition;
}
