import { Texture, Resource, Spritesheet, AnimatedSprite, ObservablePoint, BaseTexture } from "pixi.js";

export class SpriteAnimation extends AnimatedSprite {
  private animations: Map<String, Array<Texture<Resource>>>;
  constructor(spritesheet: Spritesheet) {
    super([new Texture<Resource>(new BaseTexture())])
    this.animations = Object
      .entries(spritesheet.animations)
      .reduce((prev, curr) => {
        return prev.set(curr[0], curr[1]);
      }, new Map<String, Array<Texture<Resource>>>());

    this.scale = new ObservablePoint(null, null, 3, 3);
    this.animationSpeed = 1 / 10;
    this.play();
  }

  getAnimations(): IterableIterator<String> {
    return this.animations.keys();
  }

  getAnimation(key: string): Array<Texture<Resource>> {
    return this.animations.get(key);
  }

  showAnimation(animation: string, loop?: boolean) {
    return new Promise((resolve, reject) => {
      console.log(`Running animation: ${animation}`);
      // Update with new textures.
      this.textures = this.getAnimation(animation);
      // Set loop
      this.loop = loop;
      // Play current animation
      this.play();
      // On complete, resolve the promise.
      this.onComplete = () => resolve(this);
    });
  }
}