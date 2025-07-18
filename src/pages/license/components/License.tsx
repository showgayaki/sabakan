import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { H2, H3, Ul, Li, A, Pre } from "./Element";

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
        <Box sx={{ width: "100%" }}>
            <H2 text="Licenses" />
            <Stack spacing={5}>
                <Box component="section">
                    <H3 text="📦 Node Modules" />
                    <Ul>
                        {visibleNodeLicenses.map((name) => {
                            const data = nodeLicenses[name];
                            return (
                                <Li key={`${data.name}@${data.version}`}>
                                    <Accordion slots={{ heading: "h4" }}
                                        sx={{ "& .MuiAccordion-heading": { m: 0 } }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontSize: "0.875rem" }}>
                                            <A
                                                href={data.repository || `https://www.npmjs.com/package/${name.split("@")[0]}`}
                                                text={name}
                                            />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Pre text={data.licenseText} />
                                        </AccordionDetails>
                                    </Accordion>
                                </Li>
                            );
                        })}
                    </Ul>
                </Box>

                <Box component="section">
                    <H3 text="🦀 Rust Crates" />
                    <Ul>
                        {visibleRustLicenses.map(({ license, crate }, idx) => (
                            <Li key={`${idx}-${crate.crate.name}`}>
                                <Accordion slots={{ heading: "h4" }}
                                    sx={{ "& .MuiAccordion-heading": { m: 0 } }}
                                >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontSize: "0.875rem" }}>
                                        <A
                                            href={crate.crate.repository || `https://crates.io/crates/${crate.crate.name}`}
                                            text={`${crate.crate.name} ${crate.crate.version}`}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Pre text={license.text} />
                                    </AccordionDetails>
                                </Accordion>
                            </Li>
                        ))}
                    </Ul>
                </Box>
            </Stack>
        </Box>
    );
}
