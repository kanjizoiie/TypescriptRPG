import * as pixiJs from "pixi.js";

const textStyle = new pixiJs.TextStyle({
  fontFamily: 'PressStart2P',
  fontSize: 8,
  fill: '#FFFFFF',
  wordWrap: true,
  wordWrapWidth: 600,
});

export class FPSCounter extends pixiJs.Graphics {
  private ticker: pixiJs.Ticker;
  private text: pixiJs.Text;
  private fpsList: Array<number> = [];


  constructor(ticker: pixiJs.Ticker) {
    super();
    this.ticker = ticker;
    this.text = this.addChild(new pixiJs.Text("", textStyle));
  }

  update(delta: number) {
    this.fpsList.push(this.ticker.FPS);

    if (this.fpsList.length >= 60) {
      this.fpsList.shift();
    }

    if (this.ticker) {
      this.text.text = `FPS: ${this.ticker.FPS.toString()}\nDELTATIME: ${this.ticker.deltaTime}\nELAPSEDMS: ${this.ticker.elapsedMS}\nLISTENERS: ${this.ticker.count}`;
    }
  }
}