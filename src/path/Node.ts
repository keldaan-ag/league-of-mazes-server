import { INode, Maze } from "../types"

export class Node implements INode{
    edges: Array<string>
    x: number
    y: number
    id: string
    visited: boolean

    constructor(x: number, y: number, maze: Maze){
        this.edges = new Array<string>()
        this.x = x
        this.y = y
        this.id = `${x}-${y}`
        this.edges = maze.getEdges(x,y)
        this.visited = false
    }
}
