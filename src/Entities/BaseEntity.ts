import { Application, Container, UPDATE_PRIORITY, Ticker } from "pixi.js";

export class BaseEntity extends Container {
  private BASE_HEALTH: number = 50;
  private BASE_MANA: number = 50;

  private str: number = 5;
  private int: number = 5;
  private dex: number = 5;
  private luk: number = 5;

  private healthPoints: number;
  private manaPoints: number;

  private dead: boolean = false;

  constructor() {
    super();

    this.healthPoints = this.calculateHealthPoints();
    this.manaPoints = this.calculateManaPoints();
  }

  /* GETTERS AND SETTERS */

  getDead(): boolean {
    return this.dead;
  }

  getHealthPoints(): number {
    return this.healthPoints;
  }

  getManaPoints() {
    return this.manaPoints;
  }

  setManaPoints(manaPoints: number) {
    this.manaPoints = manaPoints
  }

  /* FUNCTIONS */

  calculateManaPoints() {
    return (this.int * Math.PI) + this.BASE_MANA;
  }

  calculateHealthPoints() {
    return (this.str * Math.PI) + this.BASE_HEALTH;
  }


  damage(damage: number) {
    this.healthPoints -= damage;
  }

  private isDead() {
    return this.healthPoints <= 0;
  }

  update(delta: number) {
    this.dead = this.isDead();
  }
}