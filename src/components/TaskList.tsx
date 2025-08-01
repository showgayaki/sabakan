import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CancelIcon from "@mui/icons-material/Cancel";

import type { GroupedTaskStatuses } from "@/types/taskStatuses";

interface TaskListProps {
    groupedTaskStatuses: GroupedTaskStatuses;
}

export default function TaskList({ groupedTaskStatuses }: TaskListProps) {
    const groups = Object.keys(groupedTaskStatuses);
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.3,
                minWidth: "50%",
                maxWidth: "80%",
                maxHeight: "180px",
                overflowY: "auto",
                overflowX: "hidden",
                mb: 3,
            }}>
                {groups.map((group) => (
                    <Box key={group} sx={{ px: 2, mb: 2, width: "100%" }}>
                        <List
                            sx={{
                                p: 0,
                                width: "fit-content",
                                mx: "auto",
                                ml: (groups.length > 1 || group !== "Installation") ? "30px" : undefined, // GroupTitleがあるときは、アイコン分marginを取る
                            }}
                        >
                            {Object.entries(groupedTaskStatuses[group] || {}).map(([name, status]) => {
                                return (
                                    <ListItem key={`${group}-${name}`} sx={{ py: 1, px: 0, mx: "auto" }}>
                                        <ListItemIcon sx={{ minWidth: "40px" }}>
                                            {status === "success" ? (
                                                <CheckCircleIcon color="success" />
                                            ) : status === "error" ? (
                                                <CancelIcon color="error" />
                                            ) : (
                                                <RadioButtonUncheckedIcon color="warning" />
                                            )}
                                        </ListItemIcon>
                                        <Typography
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: "80%",
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                        </List>

                    </Box>
                ))}
            </Box>
        </>
    );
}
