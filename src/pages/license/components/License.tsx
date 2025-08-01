import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import FullscreenOverlay from "@/components/FullscreenOverlay";
import ProgressIcon from "@/components/ProgressIcon";

import { H2, H3, Ul, Li } from "./Element";
import { LicenseAccordion } from "./LicenseAccordion";

export default function Licenses() {
    const [nodeLicenses, setNodeLicenses] = useState<Record<string, any>>({});
    const [rustLicenses, setRustLicenses] = useState<Record<string, any>>({});

    const [visibleNodeLicenses, setVisibleNodeLicenses] = useState<string[]>([]);
    const [visibleRustLicenses, setVisibleRustLicenses] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/licenses/node.json").then(res => res.json()),
            fetch("/licenses/rust.json").then(res => res.json())
        ]).then(([nodeData, rustData]) => {
            setNodeLicenses(nodeData);
            setRustLicenses(rustData);
            setVisibleNodeLicenses(Object.keys(nodeData));
            setVisibleRustLicenses(Object.keys(rustData));
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading && (
                <FullscreenOverlay>
                    <ProgressIcon size={80} status="pending" />
                </FullscreenOverlay>
            )}
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
                                        />
                                    </Li>
                                );
                            })}
                        </Ul>
                    </Box>

                    <Box component="section">
                        <H3 text="🦀 Rust Crates" />
                        <Ul>
                            {visibleRustLicenses.map((name) => {
                                const data = rustLicenses[name];
                                const key = `${data.name}@${data.version}`;
                                return (
                                    <Li key={key}>
                                        <LicenseAccordion
                                            repository={data.repository}
                                            url={`https://crates.io/crates/${name}`}
                                            name={name}
                                        />
                                    </Li>
                                );
                            })}
                        </Ul>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}
