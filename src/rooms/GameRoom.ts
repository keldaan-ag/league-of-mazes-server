import { Room, Client } from "colyseus";
import { PhaseState } from "../game/phase/PhaseState";
import { WaitPhase } from "../game/phase/WaitPhase";
import { Phase } from "../types";
import { GameState, Player } from "./schema/GameState";

export class GameRoom extends Room<GameState> {
    phaseState: PhaseState;

    constructor(){
        super()
        this.phaseState = new WaitPhase()
    }

    onCreate (options: any) {
        this.setState(new GameState(10,10,30,10,5))
        this.changePhase(new WaitPhase())
        this.setSimulationInterval((deltaTime) => this.update(deltaTime))

        this.onMessage("type", (client, message) => {
        //
        // handle "type" message
        //
        });

    }

    changePhase(phaseState: PhaseState){
        this.phaseState.onExit()
        this.phaseState = phaseState
        this.state.phase = this.phaseState.type
        this.setPhaseTime()
        this.phaseState.onEnter()
    }

    setPhaseTime(){
        switch (this.phaseState.type) {
            case Phase.BUILD:
                this.phaseState.time = this.state.buildTime * 1000
                break
        
            case Phase.GUESS:
                this.phaseState.time = this.state.guessTime * 1000
                break
            
            case Phase.WAIT:
                this.phaseState.time = this.state.waitTime * 1000
                break

            case Phase.DRAW:
                this.phaseState.time = 0
                break

            default:
                break
        }
    }

  
    update (deltaTime: number) {
        const newPhase = this.phaseState.update(deltaTime, this.state)
        if(newPhase){
            this.changePhase(newPhase)
        }
        
    }

    onJoin (client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        this.state.players.push(new Player(client.id, this.state.width, this.state.height))
    }

    onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
