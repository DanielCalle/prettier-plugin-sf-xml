import type { Plugin } from "./types";

import parser from "./parser.js";
import printer from "./printer.js";

const plugin: Plugin = {
    languages: [
        {
            extensions: ['xml'],
            name: 'Salesforce XML Metadata',
            parsers: ['sf-xml-parse']
        }
    ],
    parsers: {
        'sf-xml-parse': parser
    },
    printers: {
        'sf-xml-print': printer
    }
}

export = plugin;
