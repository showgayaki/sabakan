import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const currentDir = process.cwd();
console.log("📂 Current directory:", currentDir);

type NodeLicenseMap = Record<
    string,
    {
        licenses: string;
        licenseText: string;
        repository?: string;
        path?: string;
        licenseFile?: string;
    }
>;

const formatJsonPath = path.resolve(currentDir, "licenses", "node-format.json");
const tmpJsonPath = path.resolve(currentDir, "licenses", "tmp.json");
const nodeJsonPath = path.resolve(currentDir, "licenses", "node.json");

// --- Node.js License Extraction ---
console.log("🔍 Extracting Node.js license data...");

const licenseCheckerBin = process.platform === "win32"
    ? "license-checker.CMD"
    : "license-checker";

const licenseCheckerPath = path.resolve(currentDir, "node_modules", ".bin", licenseCheckerBin);
execSync(`${licenseCheckerPath} --production --json --customPath ${formatJsonPath} > ${tmpJsonPath}`);

// package.json を読み込む
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const selfKey = `${pkg.name}@${pkg.version}`;

// licenses/tmp.json を読み込み
const tmpData: NodeLicenseMap = JSON.parse(fs.readFileSync(tmpJsonPath, "utf-8"));

// 自分自身のエントリを削除
delete tmpData[selfKey];

// path と licenseFile を削除
for (const key of Object.keys(tmpData)) {
    delete tmpData[key].path;
    delete tmpData[key].licenseFile;
}

// Apply override to license text before sorting
for (const [name, info] of Object.entries(tmpData)) {
    if (name.startsWith("@tauri-apps/api")) {
        info.licenseText = "MIT License\n\nSee: https://github.com/tauri-apps/tauri/blob/dev/LICENSE_MIT";
    }
}
// Save sorted Node.js license data
const sortedNodeLicenses = Object.fromEntries(
    Object.entries(tmpData).sort(([a], [b]) => a.localeCompare(b))
);
fs.writeFileSync(nodeJsonPath, JSON.stringify(sortedNodeLicenses, null, 2));
console.log("✅ Node.js license data extracted.");


// --- Rust License Extraction ---
console.log("🔍 Extracting Rust license data...");
const rustJsonPath = path.resolve(currentDir, "licenses", "rust.json");

execSync(`cargo about generate --format json -o ${rustJsonPath}`, {
    cwd: path.resolve("src-tauri"),
    maxBuffer: 1024 * 1024 * 10, // 10MB
});
console.log("✅ Rust license data extracted.");

// Reformat Rust data into node.json-like structure
const rustLicenses: {
    licenses: {
        name: string;
        text: string;
        used_by: { crate: { name: string; version: string; repository?: string } }[];
    }[];
} = JSON.parse(fs.readFileSync(rustJsonPath, "utf-8"));

const dedupedRustLicenses: Record<string, {
    name: string;
    version: string;
    licenses: string;
    repository?: string;
    licenseText: string;
}> = {};

for (const license of rustLicenses.licenses) {
    for (const used of license.used_by) {
        const key = `${used.crate.name}@${used.crate.version}`;
        if (!dedupedRustLicenses[key]) {
            dedupedRustLicenses[key] = {
                name: used.crate.name,
                version: used.crate.version,
                licenses: license.name,
                repository: used.crate.repository,
                licenseText: license.text,
            };
        }
    }
}

const sortedRustLicenses = Object.fromEntries(
    Object.entries(dedupedRustLicenses).sort(([a], [b]) => a.localeCompare(b))
);

fs.writeFileSync(rustJsonPath, JSON.stringify(sortedRustLicenses, null, 2));


let output = `# NOTICE\n\nThis application includes third-party software.\n\n`;

// --- Node.js ---
output += `## Node.js Dependencies\n\n`;
for (const [name, info] of Object.entries(sortedNodeLicenses)) {
    output += `### ${name}\n`;
    output += `License: ${info.licenses}\n`;
    output += `Repository: ${info.repository ?? "N/A"}\n\n`;
    output += "```\n";

    output += info.licenseText;
    output += "\n```\n\n"
}

output += `## Rust Crates\n\n`;
for (const [name, info] of Object.entries(sortedRustLicenses)) {
    output += `### ${name}\n`;
    output += `License: ${info.licenses}\n`;
    output += `Repository: ${info.repository ?? "N/A"}\n\n`;
    output += "```\n";

    output += info.licenseText;
    output += "\n```\n\n"
}

// --- Write to NOTICE ---
fs.writeFileSync("NOTICE", output);
console.log("✅ NOTICE file generated.");
