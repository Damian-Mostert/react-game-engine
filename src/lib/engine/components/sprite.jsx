import { useEffect, useState } from "react";

export default function Sprite({ character, action }) {
    const [imagesToPlay, setImagesToPlay] = useState([]);
    const [left, setLeft] = useState(false);
    const [toDo, setToDo] = useState("idle");
    const [loop, setLoop] = useState(true);
    const [frame, setFrame] = useState(0);

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

        setLoop(!["jump", "fall", "dead", "slide"].includes(toDoAction));
        setFrame(0); // Reset frame when action or imagesToPlay changes
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
        const intervalId = setInterval(() => {
            setFrame((prevFrame) => {
                if (loop) return prevFrame === imagesToPlay.length - 1 ? 0 : prevFrame + 1;
                return prevFrame === imagesToPlay.length - 1 ? prevFrame : prevFrame + 1;
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [loop, imagesToPlay]);

    return (
        <CharacterLoop
            img={box}
            container={container}
            images={imagesToPlay}
            left={left}
            imageIndex={frame}
        />
    );
}

export function CharacterLoop({ images = [], container = {}, img = {}, left = false, imageIndex = 1 }) {
    return (
        <div style={{ position: "relative", ...container }}>
            {images[imageIndex] && (
                <img
                    src={images[imageIndex]}
                    style={{
                        ...img,
                        position: "absolute",
                        objectFit: "cover",
                        transform: left ? "scaleX(-1)" : "",
                    }}
                    alt="sprite"
                />
            )}
        </div>
    );
}
