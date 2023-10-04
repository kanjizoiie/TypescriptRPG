import { Spritesheet, Ticker } from "pixi.js";
import { SpriteAnimation } from "../Components/SpriteAnimation/SpriteAnimtaion";
import { Target } from "../Target/Target";

export class Spell {
  spriteAnimation: SpriteAnimation;

  cost: number = 10;
  name: string = "ARCANA BASICO";
  description: string = "Basic spell.";

  constructor(spriteSheet: Spritesheet) {
    this.spriteAnimation = new SpriteAnimation(spriteSheet);
    Ticker.shared.add(() => this.update())
  }

  cast(targets?: Array<Target>) {
  }


  private update() {

  }
}