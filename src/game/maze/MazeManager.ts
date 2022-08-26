import { PathSolver } from "../../path/PathSolver"
import { ICell, IMaze, Maze, Player } from "../../types"

export class MazeManager{
    template: IMaze|undefined
    
    generateMazeTemplate(width: number, height: number){
        this.template = {
            data: new Array<ICell>(width*height),
            width: width,
            height: height,
            entry: {x:0,y:0},
            exit: {x:0,y:0},
            score: 0
        }
        this.generateEntryExit()
        this.generateCells()
    }

    generateEntryExit(){
        this.template!.entry = {x: 0, y: Math.floor(Math.random()*this.template!.height)}
        this.template!.exit = {x: this.template!.width -1, y:Math.floor(Math.random()*this.template!.height)}
    }

    generateCells(){
        for (let xi = 0; xi < this.template!.width; xi++) {
            for (let yi = 0; yi < this.template!.height; yi++) {
                const isEntry = this.template!.entry.x === xi && this.template!.entry.y === yi
                const isExit = this.template!.exit.x === xi && this.template!.exit.y === yi
                this.template!.data[this.template!.height * xi + yi] = {
                    x: xi,
                    y: yi,
                    isEntry: isEntry,
                    isExit: isExit,
                    isHole: !isEntry && !isExit && Math.random() > 0.9,
                    isPath: false,
                    isWall: false
                }
            }
        }
    }

    updateMazes(players: Player[]){
        players.forEach(p=>{
            p.maze = new Maze(this.template!)
        })
    }

    solveMazes(players: Player[]){
        const solvedMazes = new Map<string,PathSolver>()
        players.forEach(p=>{
            const solver = new PathSolver(p.maze)
            solvedMazes.set(p.id, solver)
        })
        return solvedMazes
    }

    handleCellClick(player: Player, x: number, y: number){
        const cell = player.maze.getValue(x,y)
        if(cell && !cell.isHole &&!cell.isEntry && !cell.isExit){
            cell.isWall = !cell.isWall
        }
    }
}