import * as PIXI from 'pixi.js';

export class TextBox {

  private container: PIXI.Container;
  private graphics: PIXI.Graphics;
  private text: PIXI.Text;

  constructor(textStyle?: PIXI.TextStyle) {
    this.graphics = new PIXI.Graphics();
    this.container = new PIXI.Container();
    this.text = new PIXI.Text("", textStyle);

    this.container.addChild(this.graphics);
    this.container.addChild(this.text);
  }


  setText(text: string) {
    this.updateRectangle();
    this.updateText(text);
  }

  setPosition(x: number, y: number) {
    this.container.x = x;
    this.container.y = y;
  }

  onClick(listener: (event: any) => void) {
    this.text.interactive = true;
    this.text.on('click', (event: any) => {
      listener(event);
    });
  }

  private updateText(text: string) {
    this.text.text = text;
  }

  private updateRectangle() {
    this.graphics
      .clear()
      .beginFill(0xf00000)
      .drawRect(0, 0, this.text.width, this.text.height)
      .endFill();

  }

  draw(container: PIXI.Container) {
    container.addChild(this.container);
  }
}