import { Ticker, Container, Graphics, ITextStyle, Text, TextStyle, UPDATE_PRIORITY, Sprite } from 'pixi.js';


interface MenuItem {
  text?: string;
  sub?: Array<MenuItem>;
}

interface MenuData {
  row: Container,
  text: Text,
  selector: Graphics | Text | Sprite
}

export class Menu extends Container {

  private menuModel: Array<MenuItem>;
  private menuModelHistory: Array<Array<MenuItem>> = [];
  private dataModel: Array<MenuData>;

  private selected: number = 0;
  private disabled: boolean = false;



  constructor(
    menuModel: Array<MenuItem>,
  ) {
    super();

    /**
     * Set members.
     */
    this.menuModel = menuModel;

    /**
     * Create base menu!
     */
    this.setMenuModel(menuModel)


    /**
     * Setup ticker for the updating of the menu!
     */
    Ticker.shared.add(() => {
      this.update();
    }, null, UPDATE_PRIORITY.NORMAL)
  }

  setDisabled(disable: boolean) {
    this.disabled = disable;
    this.createMenu();
  }

  setMenuModel(menuModel: Array<MenuItem>) {
    this.selected = 0;
    this.menuModel = menuModel;
    this.createMenu();
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
    const selected = this.menuModel[this.selected];
    if (selected.sub) {
      /**
       * Push current menu model to stack.
       */
      this.menuModelHistory.push(this.menuModel);
      /**
       * Set submenu as current menu model.
       */
      this.setMenuModel(selected.sub);
    } else {
    }
  }

  back() {
    this.setMenuModel(this.menuModelHistory.pop());
  }

  private generateGraphics() {
    return new Graphics()
  }

  private getTextStyle() {
    if (this.disabled) {
      return new TextStyle({
        fontFamily: 'PressStart2P',
        fontSize: 12,
        fill: '#a5a5a5',
        wordWrap: true,
        wordWrapWidth: 600,
      });
    } else {
      return new TextStyle({
        fontFamily: 'PressStart2P',
        fontSize: 12,
        fill: '#FFFFFF',
        wordWrap: true,
        wordWrapWidth: 600,
      });
    }
  }
  
  private generateText() {
    return new Text("PLACEHOLDER!", this.getTextStyle());
  }

  private generateRow() {
    return new Container();
  }

  /**
   * Creates the displayobjects.
   */
  private createMenu() {
    this.removeChildren();
    /**
     * For each item, create model datapoint.
     */
    this.dataModel = this.menuModel.map(({ text }, index) => {
      /**
       * Generate and add container as row
       */
      const row = this.addChild(this.generateRow());

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
      row.transform.position.set(0, (index * text.height));
      text.position.x = 24;
    })
  }

  /**
   * Updates the displayobjects with new data
   */
  private update() {
    this.dataModel.map(({ row, selector, text }, index) => {
      if (row) {
        if (text.text != this.menuModel[index].text) {
          text.text = this.menuModel[index].text;
        }

        if (selector instanceof Graphics) {
          selector
            .clear()
            .beginFill(this.selected == index ? 0x00FF00 : 0xFF0000)
            .drawCircle(0, (text.height / 2), 3)
        }
      }
    });
  }
}