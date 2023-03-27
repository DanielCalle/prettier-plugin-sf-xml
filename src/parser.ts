import * as xml2js from "xml2js";

import type { Parser } from "./types";
import { xmlParseOptions } from "./settings.js";

const parser: Parser = {
    parse(text) {
        const parser = new xml2js.Parser(xmlParseOptions);
        let parsedXML: any;

        parser.parseString(text, function (err, result) {
            if (!result) {
                throw new SyntaxError(`An error occurred while parsing the XML data. Please ensure that the XML document is well-formed and valid according to the specified schema: ${err}`);
            }

            parsedXML = result;
        });

        return { parsedXML };

    },
    astFormat: "sf-xml-print",
    locStart(node) {
        return node.location!.startOffset;
    },
    locEnd(node) {
        return node.location!.endOffset!;
    }
};

export default parser;
