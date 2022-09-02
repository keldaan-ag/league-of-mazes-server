import { PathSolver } from "../../path/PathSolver";
import { ICell, IMaze, Mask, Maze, Player, TerrainType } from "../../types";
import Masker from "./Masker";

export class MazeManager {
  template: IMaze | undefined;

  generateMazeTemplate(width: number, height: number) {
    this.template = {
      data: new Array<ICell>(width * height),
      width: width,
      height: height,
      entry: { x: 0, y: 0 },
      exit: { x: 0, y: 0 },
      score: 0,
    };
    this.generateEntryExit();
    this.generateCells();
    this.generateMask(this.template!);
  }

  generateEntryExit() {
    this.template!.entry = {
      x: 0,
      y: Math.floor(Math.random() * this.template!.height),
    };
    this.template!.exit = {
      x: this.template!.width - 1,
      y: Math.floor(Math.random() * this.template!.height),
    };
  }

  generateCells() {
    for (let xi = 0; xi < this.template!.width; xi++) {
      for (let yi = 0; yi < this.template!.height; yi++) {
        const isEntry =
          this.template!.entry.x === xi && this.template!.entry.y === yi;
        const isExit =
          this.template!.exit.x === xi && this.template!.exit.y === yi;
        this.template!.data[this.template!.height * xi + yi] = {
          x: xi,
          y: yi,
          isEntry: isEntry,
          isExit: isExit,
          isHole: !isEntry && !isExit && Math.random() > 0.9,
          isPath: false,
          isWall: false,
          mask: Mask.A,
        };
      }
    }
  }

  generateMask(maze: IMaze) {
    const masker = new Masker();
    const terrain = new Array<TerrainType[]>();

    for (let xi = 0; xi < maze.width; xi++) {
      const column = [];
      for (let yi = 0; yi < maze.height; yi++) {
        column.push(TerrainType.GROUND);
      }
      terrain.push(column);
    }

    maze.data.forEach((v) => {
      terrain[v.x][v.y] = v.isHole
        ? TerrainType.WATER
        : v.isWall
        ? TerrainType.WALL
        : TerrainType.GROUND;
    });

    maze.data.forEach((v) => {
      maze.data[maze.height * v.x + v.y].mask = masker.mask8bits(
        terrain,
        v.x,
        v.y
      );
    });
  }

  updateMazes(players: Player[]) {
    players.forEach((p) => {
      p.maze = new Maze(this.template!);
    });
  }

  solveMazes(players: Player[]) {
    const solvedMazes = new Map<string, PathSolver>();
    players.forEach((p) => {
      const solver = new PathSolver(p.maze);
      solvedMazes.set(p.id, solver);
    });
    return solvedMazes;
  }

  handleCellClick(player: Player, x: number, y: number) {
    const cell = player.maze.getValue(x, y);
    if (cell && !cell.isHole && !cell.isEntry && !cell.isExit) {
      cell.isWall = !cell.isWall;
      this.generateMask(player.maze);
    }
  }
}
