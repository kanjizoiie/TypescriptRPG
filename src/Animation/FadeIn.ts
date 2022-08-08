import { Animation } from "./Animation";

export class FadeIn extends Animation {
  object: { alpha: number }
  duration: number = 100;

  constructor(object: { alpha: number }, duration?: number) {
    super();
    this.object = object;
    this.duration = duration;
    super.setup(this.fadeIn);
  }

  fadeIn() {
    this.object.alpha = this.tween(this.currentTime, 0, 1, this.duration);
  }
}