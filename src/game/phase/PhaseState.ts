import { GameRoom } from "../../rooms/GameRoom"
import { Phase } from "../../types"

export abstract class PhaseState{
    time: number
    type: Phase

    constructor(){
        this.time = 0
        this.type = Phase.WAIT
    }

    update(dt: number, gameRoom: GameRoom): void|PhaseState{
        this.time -= dt
        const newTime = Math.max(0, Math.round(this.time / 1000))
        if(gameRoom.state.time !== newTime){
            gameRoom.state.time = newTime
        }
    }

    onExit(gameRoom: GameRoom){}

    onEnter(gameRoom: GameRoom){}
}