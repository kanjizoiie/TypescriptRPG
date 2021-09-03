import * as React from "react";
import * as PIXI from 'pixi.js';

import { TextBox } from "./UI/TextBox/TextBox";
import { TextStyle, Ticker } from "pixi.js";
import { Menu } from "./UI/Menu/Menu";
import { InputSystem } from "./utils/keyboard";

export class App extends React.Component<{}, {}> {

    app: PIXI.Application;
    inputsystem: InputSystem;

    containerRef: HTMLElement;
    constructor(props: any) {
        super(props);

        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
        });

        this.inputsystem = new InputSystem();

        this.inputsystem.addKeyboardEvent("a", {
            keydown: () => {
                console.log("Hello, world!")
            }
        })
        this.inputsystem.registerInputs();
    }

    componentDidMount() {
        this.containerRef.appendChild(this.app.view);

        let menu = new Menu([{}, {}, {}], new TextStyle({
            fontFamily: 'PressStart2P',
            fontSize: 18,
            fill: "#FFFFFF",
            wordWrap: true,
            wordWrapWidth: 600,
        }));

        let textBox = new TextBox(new TextStyle({
            fontFamily: 'PressStart2P',
            fontSize: 12,
            fill: "#FFFFFF",
            wordWrap: true,
            wordWrapWidth: 600,
        }));

        this.app.ticker.add(() => {
            textBox.setPosition(Math.floor(250 + Math.random() * 10), Math.floor(Math.random() * 10))
            textBox.setText(`FPS: ${this.app.ticker.FPS.toString()}\nDELTAMS: ${this.app.ticker.deltaMS.toString()}`)
            menu.setText();
        })


        this.app.stage.addChild(textBox.drawUI());
        this.app.stage.addChild(menu.drawUI());


        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                console.log("Stopping ticker as page is not visible!");
                if (this.app) this.app.ticker.stop();
            } else {
                console.log("Starting ticker as page is visible!");
                if (this.app) this.app.ticker.start();
            }
        }, false);
    }



    render(): JSX.Element {
        return (
            <div ref={(element: HTMLElement) => { this.containerRef = element }}>
            </div>
        );
    }
}

