import { useEffect, useState } from "react";
import useSwipe from "./use-swipe";

export default function useKeys() {
    const [keys, setKeys] = useState({});
    const [lastKeys, setLastKeys] = useState({});

    const swipe = useSwipe();

    const keyPressDownListener = (ev) => {
        setKeys(prevKeys => ({
            ...prevKeys,
            [ev.key.toLowerCase()]: true
        }));
    };

    const keyPressUpListener = (ev) => {
        setKeys(prevKeys => {
            setLastKeys(prevKeys);
            const newKeys = { ...prevKeys };
            delete newKeys[ev.key.toLowerCase()];
            return newKeys;
        });
    };

    // Handle swipe direction to set key events
    useEffect(() => {
        if (swipe.x > 70) {
            // Right swipe, set right arrow key
            setKeys(prevKeys => ({
                ...prevKeys,
                d: true
            }));
            setLastKeys(prevKeys => ({
                ...prevKeys,
                d: false
            }));
        } else if (swipe.x < -70) {
            // Left swipe, set left arrow key
            setKeys(prevKeys => ({
                ...prevKeys,
                a: true
            }));
            setLastKeys(prevKeys => ({
                ...prevKeys,
                a: false
            }));
        } else if (swipe.y > 70) {
            // Down swipe, set down arrow key
            setKeys(prevKeys => ({
                ...prevKeys,
                s: true
            }));
            setLastKeys(prevKeys => ({
                ...prevKeys,
                s: false
            }));
        } else if (swipe.y < -70) {
            // Up swipe, set up arrow key
            setKeys(prevKeys => ({
                ...prevKeys,
                w: true
            }));
            setLastKeys(prevKeys => ({
                ...prevKeys,
                w: false
            }));
        } else {
            // Reset keys if no swipe exceeds the threshold
            setKeys({});
            setLastKeys({});
        }
    }, [swipe]);

    useEffect(() => {
        window.addEventListener("keydown", keyPressDownListener);
        window.addEventListener("keyup", keyPressUpListener);

        return () => {
            window.removeEventListener("keydown", keyPressDownListener);
            window.removeEventListener("keyup", keyPressUpListener);
        };
    }, []);

    return { keys, lastKeys };
}
