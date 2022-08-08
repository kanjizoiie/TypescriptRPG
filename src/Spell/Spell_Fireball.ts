import { Container, Spritesheet } from "pixi.js";
import { SpriteAnimation } from "../SpriteAnimation/SpriteAnimtaion";
import { Target } from "../Target/Target";
import { Spell } from "./Base";


export class Fireball extends Spell {
  cost: number = 10;
  name: string = "ARCANA FLAM";
  description: string = "Fireball spell.";
  spriteAnimation: SpriteAnimation;

  constructor(spriteSheet: Spritesheet) {
    super();
    this.spriteAnimation = new SpriteAnimation(spriteSheet);
  }

  cast(targets?: Array<Target>) {
    if (!targets) return;
    targets[0].damage(10 + (Math.random() * 10));
  }

  draw(container: Container) {
    container.addChild(this.spriteAnimation);
  }
}