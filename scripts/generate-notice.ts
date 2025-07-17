import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { marked } from "marked";

// --- Node.js License Extraction ---
console.log("🔍 Extracting Node.js license data...");
execSync(`node_modules/license-checker/bin/license-checker --production --json --customPath licenses/node-format.json > licenses/tmp.json`);
execSync(`jq 'del(."sabakan@0.1.0") | with_entries(.value |= del(.path, .licenseFile))' licenses/tmp.json > licenses/node.json`);
console.log("✅ Node.js license data extracted.");

// --- Rust License Extraction ---
console.log("🔍 Extracting Rust license data...");
// execSync(`cargo about generate --format json > licenses/rust.json`);
const rustJson = execSync(`cargo about generate --format json`, {
    cwd: path.resolve("src-tauri"),
    maxBuffer: 1024 * 1024 * 10, // 10MB
});
fs.writeFileSync("licenses/rust.json", rustJson);
console.log("✅ Rust license data extracted.");

// --- Generate NOTICE markdown ---
type NodeLicenseMap = Record<
    string,
    {
        licenses: string;
        licenseText: string;
        repository?: string;
    }
>;

const nodeLicenses: NodeLicenseMap = JSON.parse(
    fs.readFileSync(path.resolve("licenses/node.json"), "utf-8")
);
// Save sorted Node.js license data
const sortedNodeLicenses = Object.fromEntries(
    Object.entries(nodeLicenses).sort(([a], [b]) => a.localeCompare(b))
);
fs.writeFileSync("licenses/node.json", JSON.stringify(sortedNodeLicenses, null, 2));

let output = `# NOTICE\n\nThis application includes third-party software.\n\n`;

// --- Node.js ---
output += `## Node.js Dependencies\n\n`;
for (const [name, info] of Object.entries(sortedNodeLicenses)) {
    output += `### ${name}\n`;
    output += `License: ${info.licenses}\n\n`;
    output += `Repository: ${info.repository ?? "N/A"}\n\n\n`;
    output += "```\n";

    const overrideLicenseText = name.startsWith("@tauri-apps/api")
        ? "MIT License\n\nSee: https://github.com/tauri-apps/tauri/blob/dev/LICENSE_MIT"
        : info.licenseText;

    output += overrideLicenseText;
    output += "\n```\n\n"
}

// --- Rust Crates ---
const rustLicenses: {
    licenses: {
        name: string;
        text: string;
        used_by: { crate: { name: string; version: string; repository?: string } }[];
    }[];
} = JSON.parse(fs.readFileSync(path.resolve("licenses/rust.json"), "utf-8"));

output += `## Rust Crates\n\n`;
const seen = new Set();
const rustEntries = rustLicenses.licenses
    .flatMap(license => license.used_by.map(used => ({
        name: `${used.crate.name} ${used.crate.version}`,
        license: license.name,
        text: license.text,
        repository: used.crate.repository ?? "N/A",
    })))
    .filter(entry => {
        const key = entry.name;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
// Save deduplicated and sorted Rust license data
fs.writeFileSync("licenses/rust.json", JSON.stringify(rustEntries, null, 2));

for (const entry of rustEntries) {
    output += `### ${entry.name}\n`;
    output += `License: ${entry.license}\n`;
    output += `Repository: ${entry.repository}\n\n`;
    output += "```\n";
    output += entry.text;
    output += "\n```\n\n";
}

// --- Write to NOTICE ---
fs.writeFileSync("NOTICE", output);
console.log("✅ NOTICE file generated.");
