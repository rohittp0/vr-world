import Button from "@mui/material/Button";

import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import Game from "./utils/game";




export default function Home()
{
    const [game, setGame] = useState<Game>();

    useEffect(() =>
    {
       if (!game)
           setGame(new Game());
    });

    return (
        <>{
            game && !game.running && <Button variant="contained" onClick={() => game.initWebXr()}>
                Start
            </Button>
        }
            <div id="3root"></div>
        </>
    );
}

const render = createRoot(document.getElementById("root") as HTMLDivElement);
render.render(<Home/>);
