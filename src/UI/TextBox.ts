import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { textStyle } from '../Constants/Constants'

export class TextBox extends Container {
  private currentTextbox: number = 0;
  private textboxHistory: Array<Text> = [];


  constructor(data?: Array<string | number>) {
    super();
    this.textboxHistory = data.map((dataString) => new Text(dataString, textStyle));
    this.updateText();
  }

  nextText() {
    this.currentTextbox++;
    this.updateText();
  }

  previousText() {
    this.currentTextbox--;
    this.updateText();
  }

  updateText() {
    this.removeChildren()
    this.addChild(this.textboxHistory[this.currentTextbox])
  }
}