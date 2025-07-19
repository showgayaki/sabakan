import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import { H2, H3, Ul, Li, LicenseAccordion } from "./Element";

export default function Licenses() {
    const [nodeLicenses, setNodeLicenses] = useState<Record<string, any>>({});

    const [visibleNodeLicenses, setVisibleNodeLicenses] = useState<string[]>([]);
    const [visibleRustLicenses, setVisibleRustLicenses] = useState<{ license: any, crate: any }[]>([]);

    useEffect(() => {
        fetch("/licenses/node.json")
            .then(res => res.json())
            .then(data => {
                setNodeLicenses(data);
                const keys = Object.keys(data);
                setVisibleNodeLicenses(keys);
            });

        fetch("/licenses/rust.json")
            .then(res => res.json())
            .then((data: any[]) => {
                const formatted = data.map(entry => ({
                    license: { name: entry.license, text: entry.text },
                    crate: {
                        crate: {
                            name: entry.name.split(" ")[0],
                            version: entry.name.split(" ")[1],
                            repository: entry.repository
                        }
                    }
                }));
                setVisibleRustLicenses(formatted);
            });
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <H2 text="Licenses" />

            <Stack spacing={5}>
                <Box component="section">
                    <H3 text="📦 Node Modules" />
                    <Ul>
                        {visibleNodeLicenses.map((name) => {
                            const data = nodeLicenses[name];
                            const key = `${data.name}@${data.version}`;
                            return (
                                <Li key={key}>
                                    <LicenseAccordion
                                        repository={data.repository}
                                        url={`https://www.npmjs.com/package/${name.split("@")[0]}`}
                                        name={name}
                                        licenseText={data.licenseText}
                                    />
                                </Li>
                            );
                        })}
                    </Ul>
                </Box>

                <Box component="section">
                    <H3 text="🦀 Rust Crates" />
                    <Ul>
                        {visibleRustLicenses.map(({ license, crate }, idx) => {
                            const key = `${crate.crate.name}@${crate.crate.version}`;
                            return (
                                <Li key={key}>
                                    <LicenseAccordion
                                        repository={crate.crate.repository}
                                        url={`https://crates.io/crates/${crate.crate.name}`}
                                        name={`${crate.crate.name} ${crate.crate.version}`}
                                        licenseText={license.text}
                                    />
                                </Li>
                            );
                        })}
                    </Ul>
                </Box>
            </Stack>
        </Box>
    );
}
