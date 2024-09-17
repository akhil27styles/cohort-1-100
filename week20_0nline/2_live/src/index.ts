
import { startLogger } from "./logger";
import { games } from "./store";


startLogger();

setInterval(() => {
    games.push({
        id: Math.random().toString(),
        whitePlayerName: "harkirat",
        blackPlayerName: "jaskirat",
        moves: []
    })
}, 5000)
