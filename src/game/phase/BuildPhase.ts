import { GameRoom } from "../../rooms/GameRoom";
import { Phase } from "../../types";
import { GuessPhase } from "./GuessPhase";
import { PhaseState } from "./PhaseState";

export class BuildPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.BUILD
    }


    update(dt: number, gameRoom: GameRoom): void|PhaseState{
        super.update(dt, gameRoom)
        if(this.time <= 0){
            return new GuessPhase()
        }
    }
    
    onExit(gameRoom: GameRoom){
        super.onExit(gameRoom)
    }

    onEnter(gameRoom: GameRoom){
        super.onEnter(gameRoom)
        this.time = gameRoom.state.buildTime * 1000
    }
}