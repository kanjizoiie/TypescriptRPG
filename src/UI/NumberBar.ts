import { Container, Graphics, Text, TextStyle, TextStyleFill } from "pixi.js";
import { Animation } from "../Animation/Animation";
import { Tweens } from "../Animation/tweens";


export interface NumberBarOptions {
  foreground?: number,
  background?: number,
  outline?: {
    width: number,
    color: number,
  },
  size: {
    width: number,
    height: number,
  }
  max?: number,
  min?: number,
}

export class NumberBar extends Container {
  private background: Graphics = new Graphics();
  private foreground: Graphics = new Graphics();
  private outline: Graphics = new Graphics();
  private anim: Animation;

  private options: NumberBarOptions;
  private progress: number = 0;

  private text: Text;
  private endProgress: number;
  private startProgress: number;


  private animatedProgress: number;


  constructor(options?: NumberBarOptions) {
    super();
    this.options = options;
    this.anim = new Animation();
    this.text = new Text("", new TextStyle({
      fontFamily: 'PressStart2P',
      fontSize: 0.8 * this.options.size.height,
      fontWeight: "bolder",
      fill: 0x000000,
      wordWrap: true,
      wordWrapWidth: 600,
    }));

    this.text.anchor.set(0.5, 0.5);
    this.text.y = this.options.size.height / 2;
    this.text.x = this.options.size.width / 2;
    this.addChild(this.background, this.foreground, this.outline, this.text);
  }

  private updateProgress() {
    this.text.text = this.progress;
    this
      .background
      .beginFill(this.options.background)
      .drawRect(0, 0, this.options.size.width, this.options.size.height)

    this
      .foreground
      .clear()
      .beginFill(this.options.foreground)
      .drawRect(0, 0, this.animatedProgress * this.options.size.width, this.options.size.height)

    if (this.options.outline) {
      this
        .outline
        .lineStyle(
          this.options.outline.width,
          this.options.outline.color
        )
        .drawRect(0, 0, this.options.size.width, this.options.size.height);
    }
  }

  /**
   * Set the progress of the bar.
   * @param progress Progress value between 0 and 1
   */
  setProgress(progress: number) {
    /**
     * Set startpoint for animation
     */
    this.startProgress = this.progress;

    /**
     * Set endpoint for animation
     */
    this.endProgress = progress / this.options.max;

    /**
     * Set progress for text
     */
    this.progress = progress;

    this.anim.start();
  }


  update(delta: number): void {
    /**
     * Update the animated progress by tween 
     */
    this.animatedProgress = this.anim.tween(this.startProgress, this.endProgress);

    /**
     * Update the visuals of the bar.
     */
    this.updateProgress();
  }
}