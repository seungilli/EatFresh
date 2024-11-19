import React, { createContext, useContext, ReactNode } from "react";
import useFavorites from "./useFavorites";

type FavoritesContextType = ReturnType<typeof useFavorites>;

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const favorites = useFavorites();

    return React.createElement(
        FavoritesContext.Provider,
        { value: favorites },
        children
    );
};

export const useFavoritesContext = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error(
            "useFavoritesContext must be used within a FavoritesProvider"
        );
    }
    return context;
};
