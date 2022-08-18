import { GameRoom } from "../../rooms/GameRoom";
import { Phase } from "../../types";
import { DrawPhase } from "./DrawPhase";
import { PhaseState } from "./PhaseState";
import { WaitPhase } from "./WaitPhase";

export class GuessPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.GUESS
    }


    update(dt: number, gameRoom: GameRoom): void|PhaseState{
        super.update(dt, gameRoom)
        if(this.time <= 0){
            return new WaitPhase()
        }
    }
    
    onExit(gameRoom: GameRoom){
        super.onExit(gameRoom)
    }

    onEnter(gameRoom: GameRoom){
        super.onEnter(gameRoom)
        this.time = gameRoom.state.guessTime * 1000
    }
}