import { generateRichText } from './generators';
import { parseMarkdown } from './utils/parse-markdown';

export const convert = (md: string) => generateRichText(parseMarkdown(md));

export default convert;
