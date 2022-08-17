import { GameState } from "../../rooms/schema/GameState";
import { Phase } from "../../types";
import { GuessPhase } from "./GuessPhase";
import { PhaseState } from "./PhaseState";

export class BuildPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.BUILD
    }


    update(dt: number, gameState: GameState): void|PhaseState{
        super.update(dt, gameState)
        if(this.time <= 0){
            return new GuessPhase()
        }
    }

    onExit(){}

    onEnter(){}
}