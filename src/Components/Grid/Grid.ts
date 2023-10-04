import * as pixiJs from "pixi.js";

export class Grid extends pixiJs.Graphics {
  xSize: number = 32;
  ySize: number = 32;

  gridWidth: number = 0;
  gridHeight: number = 0;

  constructor(width: number, height: number) {
    super();

    this.gridWidth = width;
    this.gridHeight = height;
  }

  update(delta: number) {
    this.clear();
    this
      .lineStyle(1, 0xffffff, 0.4);
    for (let x = 0; x <= this.gridWidth; x += this.xSize) {
      for (let y = 0; y <= this.gridHeight; y += this.ySize) {
        this.drawRect(x, y, 32, 32);
      }
    }
  }
}