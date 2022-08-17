import { GameState } from "../../rooms/schema/GameState";
import { Phase } from "../../types";
import { PhaseState } from "./PhaseState";

export class DrawPhase extends PhaseState{

    constructor(){
        super()
        this.type = Phase.DRAW
    }


    update(dt: number, gameState: GameState): void|PhaseState{
        super.update(dt, gameState)
    }

    onExit(){}

    onEnter(){}
}