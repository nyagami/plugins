import * as fs from "fs";
import { languages } from "@libs/languages";
import * as path from "path";
const root = path.dirname(__dirname);

const replaceExports = (text: string) => {
    return text.replace(
        `Object.defineProperty(exports, "__esModule", { value: true });`,
        `module.exports = exports = {"__esModule":true}`
    );
};

// plugins
for (let language in languages) {
    // language with English name
    const languageNative = languages[language as keyof typeof languages];
    const langPath = path.join(root, "plugins", language.toLowerCase());
    if (!fs.existsSync(langPath)) continue;
    const pluginFiles = fs.readdirSync(langPath);
    pluginFiles.forEach((plugin) => {
        if (plugin.startsWith(".")) return;
        const pluginPath = path.join(langPath, plugin);
        console.log("Fixing", pluginPath);
        const fileContent = fs.readFileSync(pluginPath);
        const fileText = fileContent.toString();
        const replacedText = replaceExports(fileText);

        fs.writeFileSync(pluginPath, replacedText);
    });
}
// libs
const pathsToCheck = ["libs", "types", "scripts"];
for (let checkPath of pathsToCheck) {
    const fullPath = path.join(root, checkPath);
    if (!fs.existsSync(fullPath)) continue;
    const libFiles = fs.readdirSync(fullPath);
    libFiles.forEach((libFile) => {
        const libPath = path.join(fullPath, libFile);
        console.log("Fixing", libPath);
        const fileContent = fs.readFileSync(libPath);
        const fileText = fileContent.toString();
        const replacedText = replaceExports(fileText);
        fs.writeFileSync(libPath, replacedText);
    });
}
console.log("Done ✅");
