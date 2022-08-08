import * as PIXI from 'pixi.js';
import { Container, Graphics, Application, TextStyle } from 'pixi.js';
import { Menu } from '../Menu/Menu';

export class UI {

  private container: PIXI.Container = new Container();
  private graphics: PIXI.Graphics = new Graphics();
  private currentMenu: Menu;

  battleMenu: Menu = new Menu([{
    text: "Attack",
  }, {
    text: "Spells",
  }, {
    text: "Items",
  }], new TextStyle({
    fontFamily: 'PressStart2P',
    fontSize: 18,
    fill: '#FFFFFF',
    wordWrap: true,
    wordWrapWidth: 600,
  }));


  constructor(width: number, height: number) {
    this.graphics.beginFill(0xA5A5A5);
    this.graphics.drawRect(0, 0, width, height);
    this.battleMenu.setPosition(25, 25);
    this.currentMenu = this.battleMenu;

    window.setTimeout(() => {
      console.log("Fire select;")
      this.battleMenu.setSelected(1);
    }, 5000)
  }

  setPosition(x: number, y: number): UI {
    this.container.x = x;
    this.container.y = y;
    return this;
  }

  draw(container: Container) {
    this.container.addChild(this.graphics);

    this.battleMenu.draw(this.container);

    container.addChild(this.container);
  }
}