import { Room, Client } from "colyseus";
import { MazeManager } from "../game/maze/MazeManager";
import { PhaseState } from "../game/phase/PhaseState";
import { WaitPhase } from "../game/phase/WaitPhase";
import { Phase, GameState, Player, Transfer, IBuildClick } from "../types";

import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export class GameRoom extends Room<GameState> {
  phaseState: PhaseState;
  mazeManager: MazeManager;
  uniqueNamesGeneratorConfig: Config;

  constructor() {
    super();
    this.phaseState = new WaitPhase();
    this.mazeManager = new MazeManager();
    this.uniqueNamesGeneratorConfig = {
      dictionaries: [colors, animals],
      separator: "-",
      length: 2,
    };
  }

  onCreate(options: any) {
    this.setState(new GameState(10, 10, 30, 5, 5));
    this.changePhase(new WaitPhase());
    this.setSimulationInterval((deltaTime) => this.update(deltaTime));

    this.onMessage(
      Transfer.BUILD_CLICK,
      (client: Client, message: IBuildClick) => {
        if (this.state.phase === Phase.BUILD && client.id === message.id) {
          const player = this.state.players.find((p) => p.id === message.id);
          if (player) {
            this.mazeManager.handleCellClick(player, message.x, message.y);
          }
        }
      }
    );

    this.onMessage(Transfer.GUESS_CLICK, (client: Client, guessId: string) => {
      if (
        this.state.phase === Phase.GUESS &&
        this.state.players.findIndex((p) => p.id === guessId) !== -1
      ) {
        const player = this.state.players.find((p) => p.id === client.id);
        if (player) {
          player.guessId = guessId;
        }
      }
    });
  }

  changePhase(phaseState: PhaseState) {
    this.phaseState.onExit(this);
    this.phaseState = phaseState;
    this.state.phase = this.phaseState.type;
    this.phaseState.onEnter(this);
  }

  setPhaseTime() {
    switch (this.phaseState.type) {
      case Phase.BUILD:
        this.phaseState.time = this.state.buildTime * 1000;
        break;

      case Phase.GUESS:
        this.phaseState.time = this.state.guessTime * 1000;
        break;

      case Phase.WAIT:
        this.phaseState.time = this.state.waitTime * 1000;
        break;

      case Phase.DRAW:
        this.phaseState.time = 0;
        break;

      default:
        break;
    }
  }

  update(deltaTime: number) {
    const newPhase = this.phaseState.update(deltaTime, this);
    if (newPhase) {
      this.changePhase(newPhase);
    }
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const player = new Player(client.id, this.mazeManager.template!);
    player.displayName = uniqueNamesGenerator(this.uniqueNamesGeneratorConfig);
    this.state.players.push(player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    const index = this.state.players.findIndex((p) => p.id === client.id);
    if (index !== -1) {
      this.state.players.splice(index, 1);
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
