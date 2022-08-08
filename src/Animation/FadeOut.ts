import { Animation } from "./Animation";

export class FadeIn extends Animation {
  object: { alpha: number }
  duration: number = 100;

  constructor(object: { alpha: number }, duration?: number) {
    super();
    this.object = object;
    this.duration = duration;
    super.setup(this.fadeOut);
  }

  fadeOut() {
    this.object.alpha = this.tween(this.currentTime, 1, 0, this.duration);
  }
}