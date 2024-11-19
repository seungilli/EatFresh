import React, { createContext, useContext, ReactNode } from "react";
import useHistory from "./useHistory";

type HistoryContextType = ReturnType<typeof useHistory>;

const HistoryContext = createContext<HistoryContextType | undefined>(
    undefined
);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const history = useHistory();

    return React.createElement(
        HistoryContext.Provider,
        { value: history },
        children
    );
};

export const useHistoryContext = (): HistoryContextType => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error(
            "useHistoryContext must be used within a HistoryProvider"
        );
    }
    return context;
};
