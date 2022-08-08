import * as React from 'react';
import { TextStyle, UPDATE_PRIORITY } from "pixi.js";
import * as PIXI from 'pixi.js';
import { TextBox } from '../TextBox/TextBox';

export class FPSCounter {
  textBox = new TextBox(new TextStyle({
    fontFamily: 'PressStart2P',
    fontSize: 12,
    fill: '#FFFFFF',
    wordWrap: true,
    wordWrapWidth: 600,
  }));

  update(app: PIXI.Application) {
    app.ticker.add(() => {
      this.textBox.setText(`FPS: ${app.ticker.FPS.toString()}\nDELTAMS: ${app.ticker.deltaMS.toString()}\nMAX FPS: ${app.ticker.maxFPS}\nMIN FPS: ${app.ticker.minFPS}`)
    }, UPDATE_PRIORITY.UTILITY);
  }

  draw(container: PIXI.Container) {
    this.textBox.draw(container);
  }
}