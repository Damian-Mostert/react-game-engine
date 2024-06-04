import { useEffect, useState } from "react";

export default function useKeys() {
	const [keys, setKeys] = useState({});

	const keyPressDownListener = (ev) => {
		setKeys(prevKeys => ({ 
			...prevKeys, 
			[ev.key.toLowerCase()]: true 
		}));
	};

	const keyPressUpListener = (ev) => {
		setKeys(prevKeys => {
			const newKeys = { ...prevKeys };
			delete newKeys[ev.key.toLowerCase()];
			return newKeys;
		});
	};

	useEffect(() => {
		window.addEventListener("keydown", keyPressDownListener);
		window.addEventListener("keyup", keyPressUpListener);
		
        return () => {
			window.removeEventListener("keydown", keyPressDownListener);
			window.removeEventListener("keyup", keyPressUpListener);
		};
	}, []);

	return keys;
}
