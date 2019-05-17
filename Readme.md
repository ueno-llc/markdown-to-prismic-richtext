# Markdown to Prismic RichText

For when you're importing a bunch of markdown into a prismic richtext field.

## Usage

```javascript 

const convert = require('markdown-to-prismic-richtext');

const richText = convert(yourMarkdown);

// for example use prismic-dom to render

RichText.asHtml(richText);
```

## Development 

Write a failing test and get to it! :)

```bash 

yarn test --watch

```