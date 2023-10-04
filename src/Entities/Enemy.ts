import { Spritesheet } from "pixi.js";
import { SpriteAnimation } from "../Components/SpriteAnimation/SpriteAnimtaion";
import { Spell } from "../Spell/Base";
import { BaseEntity } from "./BaseEntity";

export class Enemy extends BaseEntity {
  private spriteAnimation: SpriteAnimation;

  constructor(spriteSheet: Spritesheet) {
    super();
    this.spriteAnimation = new SpriteAnimation(spriteSheet);
    this.spriteAnimation.scale.set(-2, 2)

    this.addChild(this.spriteAnimation);
    this.spriteAnimation.showAnimation("_side idle", true);
  }

  attack(arg0: BaseEntity) {
    console.log(`Attacking!`)
    arg0.damage(10);
  }
}