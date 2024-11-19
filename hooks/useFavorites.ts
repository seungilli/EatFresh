import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types/data';

const useFavorites = () => {
    const [favorites, setFavorites] = useState<Meal[]>([]);

    const fetchFavorites = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('favorite');
            const parsedFavorites = value != null ? JSON.parse(value) : [];
            setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    }, []);

    const addFavorite = useCallback(
        async (item: Meal) => {
            try {
                const existingFavorites = await AsyncStorage.getItem('favorite');
                let updatedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];
                if (!Array.isArray(updatedFavorites)) {
                    updatedFavorites = [];
                }
                updatedFavorites.push(item);
                await AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites));
                await fetchFavorites();
            } catch (error) {
                console.error('Error adding favorite:', error);
            }
        },
        [fetchFavorites]
    );

    const removeFavorite = useCallback(
        async (id: string) => {
            try {
                const existingFavorites = await AsyncStorage.getItem('favorite');
                let updatedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];
                if (Array.isArray(updatedFavorites)) {
                    updatedFavorites = updatedFavorites.filter((meal: Meal) => meal.idMeal !== id);
                    await AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites));
                    await fetchFavorites();
                }
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        },
        [fetchFavorites]
    );

    const clearFavorites = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('favorite');
            await fetchFavorites();
        } catch (error) {
            console.error('Error clearing favorites:', error);
        }
    }, [fetchFavorites]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    return {
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        refreshFavorites: fetchFavorites,
    };
};

export default useFavorites;
