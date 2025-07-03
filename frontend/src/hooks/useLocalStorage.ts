// Hook to sync state with localStorage (scores, settings)
import { useState, useEffect } from "react";

export function useLocalStorage<T>( key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const readValue = (): T => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    };

    const [value, setValue] = useState<T>(readValue);

    useEffect(() => {
        try {
        localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore
        }
    }, [key, value]);

    return [value, setValue];
}
