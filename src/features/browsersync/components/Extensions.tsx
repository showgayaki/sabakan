import { Paper, Stack, FormControl, Divider } from "@mui/material";

import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import CustomLabel from "@/components/CustomLabel";

interface ExtensionsProps {
    extensions: {
        items: string[];
        setItems: (items: string[]) => void;
    };
}

const EXTENSION_GROUPS: string[][] = [
    [".html", ".htm", ".css",],
    [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",],
    [".vue", ".astro", ".svelte",],
    [".php", ".py", ".rb", ".pl", ".cgi", ".jsp", ".asp", ".aspx",],
    [".ejs", ".pug", ".jade", ".hbs", ".mustache", ".njk", ".twig", ".dwt", ".lbi",],
];

export default function Extensions({ extensions }: ExtensionsProps) {
    const helpText = `監視対象にするファイル拡張子を選択してください。
                      あまり多くしすぎると、リロードが重くなる可能性があります。`;

    const { items, setItems } = extensions;

    const handleToggle = (ext: string) => {
        if (items.includes(ext)) {
            setItems(items.filter((e) => e !== ext));
        } else {
            setItems([...items, ext]);
        }
    };

    return (
        <FormControl fullWidth>
            <CustomLabel
                label="監視対象にするファイル拡張子"
                htmlFor="extensions"
                helpText={helpText}
            />
            <Paper sx={{ p: 1 }}>
                <Stack gap={1.5}>
                    {EXTENSION_GROUPS.map((group, groupIndex) => (
                        <Stack key={groupIndex} spacing={1.5}>
                            <Stack direction="row" gap={1} flexWrap="wrap">
                                {group.map((ext) => (
                                    <CheckboxWithLabel
                                        key={ext}
                                        htmlFor={ext}
                                        label={ext}
                                        checked={items.includes(ext)}
                                        onChange={() => handleToggle(ext)}
                                    />
                                ))}
                            </Stack>

                            {/* 最後のグループ以外に Divider を挿入 */}
                            {groupIndex < EXTENSION_GROUPS.length - 1 && (
                                <Divider sx={{ my: 1 }} />
                            )}
                        </Stack>
                    ))}
                </Stack>
            </Paper>
        </FormControl>
    );
}
