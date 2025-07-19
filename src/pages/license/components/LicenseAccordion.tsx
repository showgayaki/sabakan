import { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { A, Pre } from "./Element";

export function LicenseAccordion({ repository, url, name, licenseText }
    : { repository: string, url: string, name: string, licenseText: string }
) {
    const [preText, setPreText] = useState<string>("");
    const [expanded, setExepanded] = useState<boolean>(false);

    const onChange = () => {
        if (!expanded && preText === "") {
            setExepanded(true);
            setPreText(licenseText);
        } else {
            setExepanded(false);
            setTimeout(() => {
                setPreText("");
            }, 200);
        }
    };

    return (
        <Accordion
            slots={{ heading: "h4" }}
            sx={{
                minHeight: 48,
                "& .MuiAccordion-heading": {
                    height: 48,
                    m: 0,
                    "& button.Mui-expanded": {
                        height: "100%",
                        minHeight: "inherit",
                    },
                    "& span.Mui-expanded": {
                        margin: "inherit",
                    },
                },
            }}
            onChange={onChange}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ fontSize: "0.875rem" }}
            >
                <A
                    href={repository || url}
                    text={name}
                />
            </AccordionSummary>
            <AccordionDetails>
                <Pre text={preText} />
            </AccordionDetails>
        </Accordion>
    )
}
