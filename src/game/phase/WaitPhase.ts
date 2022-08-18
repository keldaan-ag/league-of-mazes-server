import { GameRoom } from "../../rooms/GameRoom";
import { Phase, GameState } from "../../types";
import { BuildPhase } from "./BuildPhase";
import { PhaseState } from "./PhaseState";

export class WaitPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.WAIT
    }

    update(dt: number, gameRoom: GameRoom): void|PhaseState{
        super.update(dt, gameRoom)
        if(this.time <= 0){
            return new BuildPhase()
        }
    }
    
    onExit(gameRoom: GameRoom){
        super.onExit(gameRoom)
    }

    onEnter(gameRoom: GameRoom){
        super.onEnter(gameRoom)
        this.time = gameRoom.state.waitTime * 1000
        gameRoom.mazeManager.generateMazeTemplate(gameRoom.state.width, gameRoom.state.height)
        gameRoom.mazeManager.updateMazes(gameRoom.state.players)
    }
}