# Markdown to Prismic RichText

For when you're importing a bunch of markdown into a prismic richtext field. Based on the import docs from [Prismic.io](https://user-guides.prismic.io/import/import-full-import-reference).

## Usage

```javascript 

const convert = require('markdown-to-prismic-richtext');

const richText = convert(yourMarkdown);

// for example use prismic-dom to render

RichText.asHtml(richText);
```

## Development 

```bash 

yarn test --watch

```

