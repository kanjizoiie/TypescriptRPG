import { Ticker } from "pixi.js";

export class Animation {
  currentTime: number = 0;
  animationFunction: () => void;

  setup(animationFunction: () => void) {
    this.animationFunction = animationFunction;
    Ticker.shared.add(this.handleTick);
  }

  reset() {
    this.currentTime = 0;
  }

  private handleTick(deltaTime: number) {
    this.currentTime += deltaTime;
    if (this.animationFunction) this.animationFunction();
  }


  tween(current_time: number, start_value: number, change: number, duration: number) {
    return (change * (current_time / duration)) + start_value;
  }
}