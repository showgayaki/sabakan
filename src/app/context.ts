import { createContext, useContext } from "react";

export interface AppContextValue {
    hostOs: string;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useHostOs = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useHostOs must be used within an AppProvider");
    }
    return context.hostOs;
};
