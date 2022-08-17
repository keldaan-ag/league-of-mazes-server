import Arena from "@colyseus/arena";
/**
 * Import your Room files
 */
import { GameRoom } from "./rooms/GameRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('GameRoom', GameRoom);

    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});