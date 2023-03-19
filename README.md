<h1 align="center">Prettier for Salesforce Metadata XML</h1>

`prettier-plugin-sf-xml` is a [prettier](https://prettier.io/) plugin for Salesforce Metadata XML. `prettier` is an opinionated code formatter that supports multiple languages and integrates with most editors. The idea is to eliminate discussions of style in code review and allow developers to get back to thinking about code design instead.

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
