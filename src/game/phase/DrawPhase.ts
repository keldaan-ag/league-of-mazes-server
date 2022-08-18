import { GameRoom } from "../../rooms/GameRoom";
import { Phase } from "../../types";
import { PhaseState } from "./PhaseState";

export class DrawPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.DRAW
    }


    update(dt: number, gameRoom: GameRoom): void|PhaseState{
        super.update(dt, gameRoom)
    }
    
    onExit(gameRoom: GameRoom){
        super.onExit(gameRoom)
    }

    onEnter(gameRoom: GameRoom){
        super.onEnter(gameRoom)
        this.time = 0
    }
}