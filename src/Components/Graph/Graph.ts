import * as pixiJs from "pixi.js";

const textStyle = new pixiJs.TextStyle({
  fontFamily: 'PressStart2P',
  fontSize: 8,
  fill: '#FFFFFF',
  wordWrap: true,
  wordWrapWidth: 600,
});

export class Graph extends pixiJs.Graphics {
  private ticker: pixiJs.Ticker;
  private fpsList: Array<number> = [];
  private fpstext: pixiJs.Text;


  constructor(ticker: pixiJs.Ticker) {
    super();
    this.ticker = ticker;
    this.fpstext = this.addChild(new pixiJs.Text(this.ticker.FPS.toString(), textStyle))
  }

  update(delta: number) {
    this.clear();
    this.fpsList.push(this.ticker.FPS);
    if (this.fpsList.length >= 60) {
      this.fpsList.shift();
    }
    let x = 0;
    this
      .lineStyle(1, 0xffffff)
      .moveTo(0, 70 - this.ticker.FPS);
    this.fpsList.forEach((i) => {
      this
        .lineTo(x, 70 - i);
      x += 100 / 60
      this.fpstext.text = this.ticker.FPS.toPrecision(2).toString();
      this.fpstext.setTransform(x, 70 - i - 3);
    })
  }
}