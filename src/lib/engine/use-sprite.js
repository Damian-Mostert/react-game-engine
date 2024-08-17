import { useEffect, useState } from "react";
import CharacterLoop from "./components/character-loop";
import config from "./config/framerates";

const { sprites: Framerate } = config;

export default function useSprite(character, action) {
    const [imagesToPlay, setImagesToPlay] = useState([]);
    const [left, setLeft] = useState(false);
    const [toDo, setToDo] = useState("idle");
    const [loop, setLoop] = useState(true);
    const [frame, setFrame] = useState(0); // Initial frame set to 0
    const [rerender, setRerender] = useState(0);

    useEffect(() => {
        const isLeft = action.endsWith("-left");
        setLeft(isLeft);

        const toDoAction = isLeft ? action.split("-left")[0] : action;
        setToDo(toDoAction);

        const fullImages = {};
        for (let act of character.actions) {
            const images = Array.from(
                { length: act.frames },
                (_, i) => `/sprites/${character.name}/${act.slug} (${i + 1}).png`
            );
            fullImages[act.callback] = images;
        }

        setImagesToPlay(fullImages[toDoAction] || []);

        switch (toDoAction) {
            case "jump":
            case "fall":
            case "dead":
            case "slide":
                setLoop(false);
                break;
            default:
                setLoop(true);
                break;
        }

        setRerender(r => r + 1);
    }, [action, character]);

    let { container, box } = character;

    const overrideAction = character.actions.find(
        (act) => act.callback === toDo && act.override
    );

    if (overrideAction) {
        container = { ...container, ...overrideAction.override.container };
        box = { ...box, ...overrideAction.override.box };
    }

    useEffect(() => {
        setFrame(0);
        const intervalId = setInterval(() => {
            setFrame((prevFrame) => {
                if (loop) return prevFrame === imagesToPlay.length - 1 ? 0 : prevFrame + 1;
                return prevFrame === imagesToPlay.length - 1 ? prevFrame : prevFrame + 1;
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [rerender, loop, imagesToPlay, toDo]);

    return (
        <CharacterLoop
            img={box}
            container={container}
            images={imagesToPlay}
            left={left}
            loop={loop}
            imageIndex={frame}
        />
    );
}
