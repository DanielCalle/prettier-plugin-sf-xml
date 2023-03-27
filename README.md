<h1 align="center">Prettier for Salesforce Metadata XML</h1>

`prettier-plugin-sf-xml` is a [prettier](https://prettier.io/) plugin for Salesforce Metadata XML.

This plugin uses a modified version of the [swagup-com/sf-xml-formatter](https://github.com/swagup-com/sf-xml-formatter) xml file sorting algorithm with new features to adapt to the original Salesforce files such as 4-space tabulation and respecting the tag order.

## Getting started

To run `prettier` with the Salesforce Metadata XML plugin, you're going to need [`node`](https://nodejs.org/en/download/).

If you're using the `npm` CLI, then add the plugin by:

```bash
npm install --save-dev prettier prettier-plugin-sf-xml
```

Or if you're using `yarn`, then add the plugin by:

```bash
yarn add --dev prettier prettier-plugin-sf-xml
```

The `prettier` executable is now installed and ready for use:

```bash
./node_modules/.bin/prettier --write '**/*.xml'
```
