import { Application, Container, UPDATE_PRIORITY, Ticker } from "pixi.js";
import { NumberBar } from "../UI/NumberBar";
import { BaseEntity } from "./BaseEntity";

export class UIEntity extends BaseEntity {
  healthBar: NumberBar = new NumberBar({
    background: 0xA5A5A5,
    foreground: 0x00FF00,
    outline: {
      color: 0xFFFFFF,
      width: 2,
    },
    size: {
      height: 15,
      width: 150,
    },
    min: 0,
    max: super.getHealthPoints(),
  });


  manaBar: NumberBar = new NumberBar({
    background: 0xA5A5A5,
    foreground: 0x00FFF1,
    outline: {
      color: 0xFFFFFF,
      width: 2,
    },
    size: {
      height: 15,
      width: 150,
    },
    min: 0,
    max: super.getManaPoints(),
  });

  constructor() {
    super();
    this.healthbar.setProgress(super.getHealthPoints());
    this.manabar.setProgress(super.getManaPoints());
  }

  damage(damage: number) {
    super.damage(damage);
  }

  update(delta: number) {
    super.update(delta);

    this.manabar.update(delta);
    this.healthbar.update(delta);
  }

  get healthbar() {
    return this.healthBar;
  }

  get manabar() {
    return this.manaBar;
  }
}