import * as PIXI from 'pixi.js';


export interface menuModel {
    items: Array<MenuItem>
    selected: number
}


interface MenuItemExportable {
    text?: string
}

interface MenuItem extends MenuItemExportable {
    object?: PIXI.Text
}

export class Menu {
    private menuModel: menuModel;
    private container: PIXI.Container;
    private selector: PIXI.Text;

    constructor(inputs: Array<MenuItemExportable>, textStyle?: PIXI.TextStyle) {
        this.container = new PIXI.Container();

        this.menuModel = {
            items: inputs,
            selected: 0
        }

        for (const iterator of this.menuModel.items) {
            iterator.object = new PIXI.Text(iterator.text || "Temporary!", textStyle);
            iterator.object.interactive
        }

        this.selector = new PIXI.Text(">", textStyle)
    }

    setText(text?: string) {
        this.updateText(text);
    }

    setPosition(x: number, y: number) {
        this.container.x = x;
        this.container.y = y;
    }

    private updateText(text?: string) {
        this.menuModel.items.forEach((value, index) => {
            value.object.position.set(24, index * 24);
            if (index === this.menuModel.selected) this.selector.position.set(4, index * 24)
        })
    }
    drawUI(): PIXI.Container {
        this.container.addChild(this.selector, ...this.menuModel.items.map((value) => value.object));
        return this.container;
    }
}