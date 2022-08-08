import { isTSMethodSignature, tSMethodSignature } from '@babel/types';
import * as PIXI from 'pixi.js';
import { Ticker, Container, Graphics, ITextStyle, Text, TextStyle, UPDATE_PRIORITY, DisplayObject } from 'pixi.js';


const data: Array<MenuItem> = [
  { text: "Option 1", onSelected: () => { console.log("SELECTED OPTION 1"); } },
  { text: "Option 2 with submenu" },
]

interface MenuItem {
  text?: string;
  onSelected?: () => void;
}

export class Menu {
  private menuModel: Array<MenuItem>;
  private dataModel: Array<{ row: Container, text: Text, selector: Graphics }>;

  private selected: number = 0;
  private container: PIXI.Container;

  textStyle: TextStyle | Partial<ITextStyle>;

  constructor(menuItems: Array<MenuItem>, textStyle?: PIXI.TextStyle) {
    this.container = new PIXI.Container();
    this.textStyle = textStyle;
    this.menuModel = menuItems;

    /**
     * Create base menu!
     */
    this.createMenu();


    /**
     * Setup ticker for the updating of the menu!
     */
    Ticker.shared.add(() => {
      this.update();
    }, null, UPDATE_PRIORITY.NORMAL)
  }

  setPosition(x: number, y: number) {
    this.container.x = x;
    this.container.y = y;
  }

  setSelected(selected: number) {
    if (0 <= selected && selected < this.menuModel.length) {
      this.selected = selected;
    }
  }

  getSelected() {
    return this.selected;
  }

  select() {
    if (this.menuModel[this.selected].onSelected) this.menuModel[this.selected].onSelected();
  }

  private generateGraphics() {
    return this.container.addChild(
      new Graphics()
    );
  }

  private generateText() {
    return new Text("PLACEHOLDER!", this.textStyle);
  }

  private generateRow() {
    return this.container.addChild(new Container());
  }

  /**
   * Creates the displayobjects.
   */
  private createMenu() {
    this.dataModel = this.menuModel.map(({ text }, index) => {
      const row = this.generateRow();
      return {
        row: row,
        selector: row.addChild(this.generateGraphics()),
        text: row.addChild(this.generateText()),
      }
    })
    this.composeRow();
  }

  /**
   * Function that composes the row, sets positions and adds the objects to the render tree
   */
  private composeRow() {
    this.dataModel.forEach(({ selector, text, row }, index) => {
      row.transform.position.set(0, index * 24);
      text.position.x = 24;
    })
  }

  /**
   * Updates the displayobjects with new data
   */
  private update() {
    this.dataModel.map(({ selector, text }, index) => {
      if (text.text != this.menuModel[index].text) {
        text.text = this.menuModel[index].text;
      }
      selector
        .clear()
        .beginFill(this.selected == index ? 0x00FF00 : 0xFF0000)
        .drawCircle(0, 24 / 2, 4)
    });
  }

  draw(container: Container) {
    container.addChild(this.container);
  }
}