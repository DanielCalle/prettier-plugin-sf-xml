import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

import plugin from "../src/plugin";

const ebikesPermissionSet = fs.readFileSync(path.join(__dirname, "./ebikes.permissionset-meta.xml"), "utf-8");

const exampleProfile = fs.readFileSync(path.join(__dirname, "./example.profile-meta.xml"), "utf-8");

function format(content: string) {
    return prettier.format(content, {
      parser: "sf-xml-parse",
      plugins: [plugin as any as string] // hacky but it works
    });
  }


test("permissionSet", async () => {
    const formatted = await format(ebikesPermissionSet);
    expect(formatted).toMatchSnapshot();
});

test("profile", async () => {
    const formatted = await format(exampleProfile);
    expect(formatted).toMatchSnapshot();
});
