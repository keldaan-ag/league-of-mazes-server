import { GameState } from "../../rooms/schema/GameState"
import { Phase } from "../../types"

export abstract class PhaseState{
    time: number
    type: Phase

    constructor(){
        this.time = 0
        this.type = Phase.WAIT
    }

    update(dt: number, gameState: GameState): void|PhaseState{
        if(this.type !== Phase.DRAW){
            this.time -= dt
            const newTime = Math.max(0, Math.round(this.time / 1000))
            if(gameState.time !== newTime){
                gameState.time = newTime
            }
        }
    }

    onExit(){}

    onEnter(){}
}