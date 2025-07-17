import { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Licenses() {
    const [nodeLicenses, setNodeLicenses] = useState<Record<string, any>>({});
    const [rustLicenses, setRustLicenses] = useState<any[]>([]);

    const [visibleNodeLicenses, setVisibleNodeLicenses] = useState<string[]>([]);
    const [visibleRustLicenses, setVisibleRustLicenses] = useState<{ license: any, crate: any }[]>([]);

    useEffect(() => {
        fetch("/licenses/node.json")
            .then(res => res.json())
            .then(data => {
                setNodeLicenses(data);
                const keys = Object.keys(data);
                // let i = 0;
                // const BATCH_SIZE = 10;
                // const appendNext = () => {
                //     setVisibleNodeLicenses(prev => [...prev, ...keys.slice(i, i + BATCH_SIZE)]);
                //     i += BATCH_SIZE;
                //     if (i < keys.length) {
                //         setTimeout(appendNext, 50);
                //     }
                // };
                // appendNext();
                setVisibleNodeLicenses(keys);
            });

        fetch("/licenses/rust.json")
            .then(res => res.json())
            .then((data: any[]) => {
                setRustLicenses(data);
                let i = 0;
                const BATCH_SIZE = 20;
                const appendNext = () => {
                    setVisibleRustLicenses(prev => [
                        ...prev,
                        ...data.slice(i, i + BATCH_SIZE).map(entry => ({
                            license: { name: entry.license, text: entry.text },
                            crate: {
                                crate: {
                                    name: entry.name.split(" ")[0],
                                    version: entry.name.split(" ")[1],
                                    repository: entry.repository
                                }
                            }
                        }))
                    ]);
                    i += BATCH_SIZE;
                    if (i < data.length) {
                        setTimeout(appendNext, 50);
                    }
                };
                appendNext();
            });
    }, []);

    return (
        <Box sx={{ width: "100%"}}>
            <Typography variant="h4" gutterBottom>Licenses</Typography>

            <Typography variant="h5" sx={{ mt: 4 }}>📦 Node Modules</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {visibleNodeLicenses.map((name) => {
                    const data = nodeLicenses[name];
                    return (
                        <li key={name} style={{ marginBottom: "2rem" }}>
                            <h3>
                                <Link
                                    href={data.repository || `https://www.npmjs.com/package/${name.split("@")[0]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {name}
                                </Link>
                            </h3>
                            <pre style={{ maxHeight: 200, overflowY: "scroll", whiteSpace: "pre-wrap" }}>
                                {data.licenseText}
                            </pre>
                        </li>
                    );
                })}
            </ul>

            <Typography variant="h5" sx={{ mt: 4 }}>🦀 Rust Crates({rustLicenses.length})</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {visibleRustLicenses.map(({ license, crate }, idx) => (
                    <li key={idx} style={{ marginBottom: "2rem" }}>
                        <h3>
                            <Link
                                href={crate.crate.repository || `https://crates.io/crates/${crate.crate.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {crate.crate.name} {crate.crate.version}
                            </Link>
                        </h3>
                        <pre style={{ maxHeight: 200, overflowY: "scroll", whiteSpace: "pre-wrap" }}>
                            {license.text}
                        </pre>
                    </li>
                ))}
            </ul>
        </Box>
    );
}
