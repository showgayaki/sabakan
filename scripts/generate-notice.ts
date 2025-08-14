import fs from "fs";
import path from "path";
import { execSync } from "child_process";

type NodeLicenseMap = Record<
    string,
    {
        licenses: string;
        repository?: string;
        path?: string;
        licenseFile?: string;
    }
>;

const currentDir = process.cwd();
console.log("📂 Current directory:", currentDir);

const licenseDir = path.resolve(currentDir, "public", "licenses");
const formatJsonPath = path.join(licenseDir, "node-format.json");
const tmpJsonPath = path.join(licenseDir, "tmp.json");
const nodeJsonPath = path.join(licenseDir, "node.json");
const rustJsonPath = path.join(licenseDir, "rust.json");

function extractNodeLicenses() {
    console.log("🔍 Extracting Node.js license data from root directory...");

    const licenseCheckerBin = process.platform === "win32"
        ? "license-checker.CMD"
        : "license-checker";

    // `/sabakan/package.json` の license を tmp.json に書き出す
    const licenseCheckerPath = path.resolve(currentDir, "node_modules", ".bin", licenseCheckerBin);
    execSync(`${licenseCheckerPath} --production --json --customPath ${formatJsonPath} > ${tmpJsonPath}`);

    // public/licenses/tmp.json を読み込み
    const tmpData: NodeLicenseMap & Record<string, { licenseText?: string }> = JSON.parse(fs.readFileSync(tmpJsonPath, "utf-8"));

    console.log("🔍 Extracting Node.js license data from src-tauri/bin/node directory...");
    execSync(`${licenseCheckerPath} --production --json --customPath ${formatJsonPath} > ${tmpJsonPath}`, {
        cwd: path.resolve(currentDir, "src-tauri", "bin", "node"),
    });

    // `/sabakan/src-tauri/bin/node/package.json` の license を tmp.json に書き出す
    const tmpBinariesData: NodeLicenseMap & Record<string, { licenseText?: string }> = JSON.parse(fs.readFileSync(tmpJsonPath, "utf-8"));

    // tmpDataとtmpBinariesDataをガッチャンコ
    for (const [key, value] of Object.entries(tmpBinariesData)) {
        tmpData[key] = value;
    }

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
    // Save license texts to files and remove from JSON
    const nodeLicenseTextDir = path.resolve(currentDir, "public", "licenses", "license-texts", "node");
    if (!fs.existsSync(nodeLicenseTextDir)) {
        fs.mkdirSync(nodeLicenseTextDir, { recursive: true });
    }
    for (const [name, info] of Object.entries(tmpData)) {
        if (info.licenseText) {
            const safeName = name.replace(/\//g, "__slash__");
            const fileName = `${safeName}.txt`;
            const filePath = path.join(nodeLicenseTextDir, fileName);
            fs.writeFileSync(filePath, info.licenseText);
            delete info.licenseText;
        }
    }
    // Save sorted Node.js license data
    const sortedNodeLicenses = Object.fromEntries(
        Object.entries(tmpData).sort(([a], [b]) => a.localeCompare(b))
    );
    fs.writeFileSync(nodeJsonPath, JSON.stringify(sortedNodeLicenses, null, 2));
    fs.unlinkSync(tmpJsonPath);
    console.log("✅ Node.js license data extracted.");
}

function extractRustLicenses() {
    // --- Rust License Extraction ---
    console.log("🔍 Extracting Rust license data...");

    execSync(`cargo about generate --format json -o ${rustJsonPath}`, {
        cwd: path.resolve("src-tauri"),
        maxBuffer: 1024 * 1024 * 10, // 10MB
    });
    console.log("✅ Rust license data extracted.");

    // tauri.conf.json からproductNameを読み込む
    const tauriConf = JSON.parse(fs.readFileSync("src-tauri/tauri.conf.json", "utf-8"));
    const productName = tauriConf.productName;
    console.log(`Self package productName: ${productName}`);

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
    }> = {};

    const rustLicenseTextDir = path.resolve(currentDir, "public", "licenses", "license-texts", "rust");
    if (!fs.existsSync(rustLicenseTextDir)) {
        fs.mkdirSync(rustLicenseTextDir, { recursive: true });
    }

    for (const license of rustLicenses.licenses) {
        for (const used of license.used_by) {
            const key = `${used.crate.name}@${used.crate.version}`;
            // Sabakan自身のパッケージは除外
            if (key.startsWith(productName)) {
                continue;
            }
            if (!dedupedRustLicenses[key]) {
                dedupedRustLicenses[key] = {
                    name: used.crate.name,
                    version: used.crate.version,
                    licenses: license.name,
                    repository: used.crate.repository,
                };
                // Write license text file
                const safeKey = key.replace(/\//g, "__slash__");
                const fileName = `${safeKey}.txt`;
                const filePath = path.join(rustLicenseTextDir, fileName);
                fs.writeFileSync(filePath, license.text);
            }
        }
    }

    const sortedRustLicenses = Object.fromEntries(
        Object.entries(dedupedRustLicenses).sort(([a], [b]) => a.localeCompare(b))
    );

    fs.writeFileSync(rustJsonPath, JSON.stringify(sortedRustLicenses, null, 2));
}

extractNodeLicenses();
extractRustLicenses();

let output = `# NOTICE\n\nThis application includes third-party software.\n\n`;

// --- Node.js ---
const sortedNodeLicenses: Record<string, { licenses: string; repository?: string }> = JSON.parse(fs.readFileSync(nodeJsonPath, "utf-8"));
const nodeLicenseTextDir = path.resolve(currentDir, "public", "licenses", "license-texts", "node");
output += `## Node.js Dependencies\n\n`;
for (const [name, info] of Object.entries(sortedNodeLicenses)) {
    output += `### ${name}\n`;
    output += `License: ${info.licenses}\n`;
    output += `Repository: ${info.repository ?? "N/A"}\n\n`;

    const licenseTextPath = path.join(nodeLicenseTextDir, `${name.replace(/\//g, "__slash__")}.txt`);
    const licenseText = fs.readFileSync(licenseTextPath, "utf-8");

    output += "```\n";
    output += licenseText.trim();
    output += "\n```\n\n";
}

output += `## Rust Crates\n\n`;
const sortedRustLicenses: Record<string, { licenses: string; repository?: string }> = JSON.parse(fs.readFileSync(rustJsonPath, "utf-8"));
const rustLicenseTextDir = path.resolve(currentDir, "public", "licenses", "license-texts", "rust");
for (const [name, info] of Object.entries(sortedRustLicenses)) {
    output += `### ${name}\n`;
    output += `License: ${info.licenses}\n`;
    output += `Repository: ${info.repository ?? "N/A"}\n\n`;

    const licenseTextPath = path.join(rustLicenseTextDir, `${name.replace(/\//g, "__slash__")}.txt`);
    const licenseText = fs.readFileSync(licenseTextPath, "utf-8");

    output += "```\n";
    output += licenseText.trim();
    output += "\n```\n\n";
}

// --- Write to NOTICE ---
fs.writeFileSync("NOTICE", output);
console.log("✅ NOTICE file generated.");
