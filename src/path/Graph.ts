import { Cell, ICoordinate, IGraph, INode, Maze } from "../types"
import { Node } from "./Node"


export class Graph implements IGraph{
    nodes: Map<string,INode>
    entry: ICoordinate
    exit: ICoordinate
    constructor(maze: Maze){
        this.entry = maze.entry
        this.exit = maze.exit
        this.nodes = new Map<string,Node>()
        maze.data.forEach(cell=>{
            if(!cell.isWall && !cell.isHole){
                this.nodes.set(`${cell.x}-${cell.y}`, new Node(cell.x, cell.y, maze))
            }
        })
    }
}
