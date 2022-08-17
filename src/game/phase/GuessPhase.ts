import { GameState } from "../../rooms/schema/GameState";
import { Phase } from "../../types";
import { DrawPhase } from "./DrawPhase";
import { PhaseState } from "./PhaseState";

export class GuessPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.GUESS
    }


    update(dt: number, gameState: GameState): void|PhaseState{
        super.update(dt, gameState)
        if(this.time <= 0){
            return new DrawPhase()
        }
    }

    onExit(){}

    onEnter(){}
}