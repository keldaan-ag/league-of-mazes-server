import { PathSolver } from "../../path/PathSolver";
import { GameRoom } from "../../rooms/GameRoom";
import { Phase, Player } from "../../types";
import { PhaseState } from "./PhaseState";
import { WaitPhase } from "./WaitPhase";

export class DrawPhase extends PhaseState{
    finished: boolean;
    solvedMazes: Map<string, PathSolver>;
    rankCount: number;

    constructor(){
        super()
        this.type = Phase.DRAW
        this.finished = false
        this.solvedMazes = new Map<string,PathSolver>()
        this.rankCount = -2
    }


    update(dt: number, gameRoom: GameRoom): void|PhaseState{
        super.update(dt, gameRoom)
        if(this.time <= 0){
            if(this.rankCount === 0){
                this.time = 5000
                this.rankCount = -1
                this.computeGuess(gameRoom)
            }
            else if(this.rankCount === -1){
                return new WaitPhase()
            }
            else{
                this.drawPath(gameRoom)
                this.time = 500
            }
        }
    }

    onExit(gameRoom: GameRoom){
        super.onExit(gameRoom)
        gameRoom.state.players.forEach(p=>{
            p.rank = 0
            p.guessId = ''
        })

    }

    onEnter(gameRoom: GameRoom){
        super.onEnter(gameRoom)
        this.rankCount = gameRoom.state.players.length
        this.time = 300
        this.solvedMazes = gameRoom.mazeManager.solveMazes(gameRoom.state.players)
        gameRoom.state.players.forEach(p=>{
            const solvedMaze = this.solvedMazes.get(p.id)
            if(solvedMaze){
                p.points += solvedMaze.shortestPath.length
                if(!solvedMaze.solved){
                    this.rankPlayer(p)
                }
            }
        })
    }

    computeGuess(gameRoom: GameRoom){
        const player = gameRoom.state.players.find(p=>p.rank === 1)
        if(player){
            gameRoom.state.players.forEach(p=>{
                if(player.id === p.guessId){
                    p.points += 5
                }
            })
        }
    }

    rankPlayer(player: Player){
        player.rank = this.rankCount
        this.rankCount --
    }

    drawPath(gameRoom: GameRoom){
        gameRoom.state.players.forEach(p=>{
            const solvedMaze = this.solvedMazes.get(p.id)

            if(solvedMaze && solvedMaze.shortestPath.length > 0){
                const coordinate = solvedMaze!.shortestPath.shift()
                const cell = p.maze.getValue(coordinate!.x, coordinate!.y)
                if(cell){
                    cell.isPath = true
                }
            }
            else{
                if(p.rank === 0){
                    this.rankPlayer(p)
                }
            }
        })
    }
}