
import * as xml2js from "xml2js";

import type { Printer } from "./types";
import { sorterOptions, xmlBuilderOptions } from "./settings.js";
import { sort } from "./sorter.js";

const getTab = function (tabWidth: number, useTabs: boolean): string {
    let tab = "";
    for (let i = 0; i < tabWidth; i++) {
        if (useTabs) {
            tab += "\t";
        } else {
            tab += " ";
        }
    }
    return tab;
}

const printer: Printer = {
    print(path, opts, print) {
        xmlBuilderOptions.renderOpts.indent = getTab(opts.tabWidth, opts.useTabs);
        let builder = new xml2js.Builder(xmlBuilderOptions);
        let sortedJsonObj = sort(path.getValue().parsedXML, sorterOptions, null);
        let sortedXML = builder.buildObject(sortedJsonObj);

        // add new line at the end of the file if not exist
        if (!sortedXML.endsWith("\n")) {
            sortedXML += "\n";
        }

        return sortedXML;
    }
}

export default printer;
