import { Container, Spritesheet } from "pixi.js";
import { Target } from "../Target/Target";
import { Spell } from "./Base";


export class Fireball extends Spell {
  cost: number = 10;
  name: string = "ARCANA FLAM";
  description: string = "Fireball spell.";

  constructor(spriteSheet: Spritesheet) {
    super(spriteSheet);
  }

  cast(targets?: Array<Target>) {
    if (!targets) return;
    this.spriteAnimation
      .showAnimation("_test")
      .then(() => {
        targets.forEach((target) => {
          target.damage(10 + (Math.random() * 10));
        })
      })
  }

  draw(container: Container) {
    container.addChild(this.spriteAnimation);
  }
}