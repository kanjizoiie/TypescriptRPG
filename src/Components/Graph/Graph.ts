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
  private fpstext: pixiJs.Text;

  private fpsList: Array<number> = [];

  private BUFFER_SIZE: number = 100;

  private X_SIZE: number = 128;
  private Y_SIZE: number = 128;
  private TEXT_OFFSET: number = 5;


  constructor(ticker: pixiJs.Ticker) {
    super();
    this.ticker = ticker;
    this.fpstext = this.addChild(new pixiJs.Text(this.ticker.FPS.toString(), textStyle))
  }

  update(delta: number) {
    let x = 0;
    let y = 0;
    this.clear();
    this.fpsList.push(this.ticker.FPS);
    if (this.fpsList.length >= this.BUFFER_SIZE) {
      this.fpsList.shift();
    }

    this
      .lineStyle(1, 0xacacac)
      .drawRect(0, 0, this.X_SIZE, this.Y_SIZE);

    this
      .lineStyle(1, 0xffaaff)
      .moveTo(0, this.fpsList[0]);

    this.fpsList.forEach((i) => {
      x += this.X_SIZE / this.BUFFER_SIZE;
      y = this.Y_SIZE * (i / this.Y_SIZE);


      this.lineTo(x, y);
      this.fpstext.text = this.ticker.FPS.toPrecision(3).toString();
      this.fpstext.setTransform(x, y);
    })
  }
}