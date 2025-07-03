// Hook for handling keyboard inputs
import { useEffect } from "react";
import type { Direction } from "../game/logic";

export function useKeyboard(func: (dir: Direction) => void) {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            const keyMap: { [key: string]: Direction } = {
                ArrowUp: "up",
                ArrowDown: "down",
                ArrowLeft: "left",
                ArrowRight: "right",
                w: "up",
                s: "down",
                a: "left",
                d: "right"
            };
            const dir = keyMap[e.key];
            if (dir) {
                e.preventDefault(); // scrolling
                func(dir);
            }
        };

        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [func]);
}