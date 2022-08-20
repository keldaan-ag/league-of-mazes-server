export class Path{
    currentNodeId: string
    predecessorsIds: string[]
    constructor(currentNodeId: string, predecessorIds: string[]){
        this.currentNodeId = currentNodeId
        this.predecessorsIds = new Array<string>()
        predecessorIds.forEach(id=>this.predecessorsIds.push(id))
    }
}