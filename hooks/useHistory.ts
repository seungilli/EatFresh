import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryType } from '@/types/data';

const useHistory = () => {
    const [history, setHistory] = useState<HistoryType[]>([]);

    const fetchHistory = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('history');
            const parsedHistory = value != null ? JSON.parse(value) : [];
            setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }, []);

    const addHistoryItem = useCallback(
        async (item: HistoryType) => {
            try {
                const existingHistory = await AsyncStorage.getItem('history');
                let updatedHistory = existingHistory ? JSON.parse(existingHistory) : [];
                if (!Array.isArray(updatedHistory)) {
                    updatedHistory = [];
                }
                updatedHistory.push(item);
                await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
                await fetchHistory();
            } catch (error) {
                console.error('Error adding history:', error);
            }
        },
        [fetchHistory]
    );

    const clearHistory = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('history');
            await fetchHistory();
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    }, [fetchHistory]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return {
        history,
        addHistoryItem,
        clearHistory,
        refreshHistory: fetchHistory,
    };
};

export default useHistory;
