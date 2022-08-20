import { ICoordinate, Maze } from "../types";
import { Graph } from "./Graph";
import {Path} from './Path'

export class PathSolver{
    graph: Graph
    solved: boolean
    shortestPath: ICoordinate[]
    stack: Path[]

    constructor(maze: Maze){
        this.graph = new Graph(maze)
        this.solved = false
        this.shortestPath = new Array<ICoordinate>()
        this.stack = new Array<Path>()
        this.solve()
    }

    solve(){
        //console.log(this.graph.nodes)
        const entryNode = this.graph.nodes.get(`${this.graph.entry.x}-${this.graph.entry.y}`)
        if(entryNode){
            let shortestPath: undefined | Path = undefined
            this.stack.push(new Path(entryNode.id, [entryNode.id]))
            entryNode.visited = true
            while(this.stack.length > 0 && !shortestPath){
                const topPath = this.stack.pop()
                shortestPath = this.expandPath(topPath!)
            }
            if(shortestPath){
                this.solved = true
                this.shortestPath = (shortestPath as Path).predecessorsIds.map(id=>{
                    const node = this.graph.nodes.get(id)!
                    return {x: node.x, y: node.y}
                })
            }
            //console.log(this.solved, this.shortestPath)
        }
        else{
            console.log('no entry node')
        }
    }

    expandPath(path: Path){
        const currentNode = this.graph.nodes.get(path.currentNodeId)
        let exitFound: Path | undefined = undefined
        if(currentNode){
            for (let i = 0; i < currentNode.edges.length; i++) {
                const reachedNodeId = currentNode.edges[i];
                const reachedNode = this.graph.nodes.get(reachedNodeId)
                if(reachedNode && !reachedNode.visited){
                    reachedNode.visited = true
                    const newPath = new Path(reachedNode.id, path.predecessorsIds)
                    newPath.predecessorsIds.push(reachedNode.id)

                    if(reachedNode.x === this.graph.exit.x && reachedNode.y === this.graph.exit.y){
                        return path
                    }
                    else{
                        let index = 0
                        for (let i = 0; i < this.stack.length; i++) {
                            const p = this.stack[i];
                            if(p.predecessorsIds.length >= path.predecessorsIds.length){
                                index = i
                                break
                            }
                        }
                        this.stack.splice(index, 0, newPath)
                    }
                }
                else{
                    if(!reachedNode){
                        console.log('non reachable node', reachedNodeId)
                    }
                }
            }
        }
        else{
            console.log('no current node')
        }
        //console.log('expanding path with current Node ID', path.currentNodeId, ' predecessors ', path.predecessorsIds)
        //console.log('current stack', this.stack.map(p=>`${p.currentNodeId} size ${p.predecessorsIds.length}`))
        return exitFound
    }
}