import { ArraySchema, Schema, type } from "@colyseus/schema";
import { IGame, IMaze, IPlayer, Phase } from "../../types";

export class Maze extends Schema implements IMaze{
    @type(["number"]) data: ArraySchema<number>
    @type("number") width: number
    @type("number") height: number

    constructor(width: number, height: number){
        super()
        this.width = width
        this.height = height
        this.data = new ArraySchema<number>()
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.data.push(0)
            }
        }
    }
}

export class Player extends Schema implements IPlayer{
    @type("string") id: string
    @type(Maze) maze: Maze

    constructor(id: string, width: number, height: number){
        super()
        this.id = id
        this.maze = new Maze(width, height)
    }
}

export class GameState extends Schema implements IGame{

    @type("number") width: number
    @type("number") height: number
    @type("number") buildTime: number
    @type("number") guessTime: number
    @type("number") waitTime: number
    @type("number") time: number
    @type("string") phase: Phase
    @type([Player]) players: Player[]
    
    constructor(width: number, height: number, buildTime: number, guessTime: number, waitTime: number){
        super()
        this.players = new ArraySchema<Player>()
        this.width = width
        this.height = height
        this.buildTime = buildTime
        this.guessTime = guessTime
        this.waitTime = waitTime
        this.phase = Phase.WAIT
        this.time = waitTime
    }
  }
  