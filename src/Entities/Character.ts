import { Spritesheet, TextStyle, Text } from "pixi.js";
import { SpriteAnimation } from "../Components/SpriteAnimation/SpriteAnimtaion";
import { Spell } from "../Spell/Base";
import { Target } from '../Target/Target';
import { BaseEntity } from './BaseEntity';
import { UIEntity } from "./UIEntity";

export class Character extends UIEntity {
  private spriteAnimation: SpriteAnimation;

  private learnedSpells: Array<Spell>;

  constructor(spriteSheet: Spritesheet) {
    super();
    this.spriteAnimation = new SpriteAnimation(spriteSheet);
    this.spriteAnimation.scale.set(-2, 2)


    this.healthbar.position.set(10, 0);
    this.manabar.position.set(10, 30);

    this.addChild(this.manabar);
    this.addChild(this.healthbar);
    this.addChild(this.spriteAnimation);

    this.spriteAnimation.showAnimation("_side idle", true);
  }

  attack(targets?: Array<Target>) {
    return this.spriteAnimation
      .showAnimation("_side attack", false)
      .then(() => {
        if (targets) {
          targets.forEach((target: BaseEntity) => {
            target.damage(Math.random())
          })
        }
        this.spriteAnimation
          .showAnimation("_side idle", true);
      });
  }

  cast(spell: Spell, targets?: Array<Target>) {
    if (spell.cost >= this.getManaPoints()) {
      this.spriteAnimation
        .showAnimation("_side idle", true);
    } else {
      spell.cast(targets);
      this.setManaPoints(this.getManaPoints() - spell.cost);
      this.spriteAnimation
        .showAnimation("_side attack", false)
        .then(() => {
          this.spriteAnimation
            .showAnimation("_side idle", true);
        });
    }
  }

  damage(damage: number): void {
    console.log(`Took ${damage} damage`)
    this.spriteAnimation.showAnimation("_pick up")
      .then(() => {
        super.damage(damage);
        this.spriteAnimation.showAnimation("_side idle", true);
      });
  }

  update(delta: number) {
    super.update(delta);
  }
}