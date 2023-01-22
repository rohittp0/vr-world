import "./index.css";

import {createRoot} from "react-dom/client";
import React, {useEffect, useState} from "react";
import Game from "./utils/game";
import {Button} from "@mui/material";


function initWebXr(canvas: HTMLCanvasElement)
{
    return canvas;
}

function Home()
{
    const root3 = document.getElementById("3root");

    const [running, setRunning] = useState(false);
    const [game, setGame] = useState<Game>();

    useEffect(() =>
    {
        setGame(new Game());

        if (root3)
            if (root3.children.length > 1)
                root3.removeChild(root3.children[0]);

        return () =>
        {
            if (root3)
                root3.innerHTML = "";
        };
    }, [root3]);


    return (
        <>
            {!running && game && <Button onClick={() => initWebXr(game.canvas)}>
                Start Mapping
            </Button>}
            <div id="3root">
            </div>
        </>
    );
}

const render = createRoot(document.getElementById("root") as HTMLDivElement);
render.render(<Home/>);
