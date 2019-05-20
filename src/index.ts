import { generateRichText } from './generators';
import { parseMarkdown } from './utils/parse-markdown';

const convert = (md: string) => generateRichText(parseMarkdown(md));

export default convert;
module.exports = convert;
