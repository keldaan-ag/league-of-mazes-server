import { GameState } from "../../rooms/schema/GameState";
import { Phase } from "../../types";
import { BuildPhase } from "./BuildPhase";
import { PhaseState } from "./PhaseState";

export class WaitPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.WAIT
    }

    update(dt: number, gameState: GameState): void|PhaseState{
        super.update(dt, gameState)
        if(this.time <= 0){
            return new BuildPhase()
        }
    }

    onExit(){}

    onEnter(){}
}