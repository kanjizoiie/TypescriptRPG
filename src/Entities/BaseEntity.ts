import { Application, UPDATE_PRIORITY } from "pixi.js";

export class BaseEntity {
  private BASE_HEALTH: number = 50;
  private BASE_MANA: number = 100;

  private strength: number = 5;
  private intellect: number = 5;
  private dexterity: number = 5;
  private luck: number = 5;

  private healthPoints: number;
  private manaPoints: number;

  private dead: boolean = false;

  constructor() {
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

  /* FUNCTIONS */

  calculateManaPoints() {
    return (this.intellect * 32) + this.BASE_MANA;
  }

  calculateHealthPoints() {
    return (this.strength * 3.1419) + this.BASE_HEALTH;
  }


  damage(damage: number) {
    this.healthPoints -= damage;
  }

  private isDead() {
    return this.healthPoints <= 0;
  }

  update(app: Application) {
    app.ticker.add(() => {
      this.dead = this.isDead();
    }, UPDATE_PRIORITY.HIGH);
  }
}