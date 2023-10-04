import { Ticker } from "pixi.js";

export class Animation {
  private currentTime: number = 1;
  private duration: number = 32;
  private ticker: Ticker;

  constructor() {
    this.ticker = new Ticker();
    this.ticker.add((delta) => { this.update(delta) });
  }

  start() {
    this.ticker.start();
  }

  stop() {
    this.ticker.stop();
  }

  reset() {
    this.stop();
    this.currentTime = 1;
    this.start();
  }

  private update(deltaTime: number) {
    this.currentTime += deltaTime;
    if (this.currentTime >= this.duration) {
      this.currentTime = this.duration;
      this.stop();
    }
  }

  tween(startValue: number, endValue: number) {
    return (endValue * (this.currentTime / this.duration)) + startValue;
  }
}