import { BattleState } from "../Scenes/Battle/Battle";
import { Enemy } from "../Entities/Enemy";
import { Target } from "../Target/Target";
import { Character } from "../Entities/Character";

export class BattleAi {
  private state: BattleState;

  setState(state: BattleState) {
    this.state = state;
  }

  needHealing(): Array<Character> {
    return this
      .state
      .characters
      .slice()
      .sort((a, b) => a.getHealthPoints() - b.getHealthPoints());
  }

  getTargets(): Array<Target> {
    return this
      .state
      .characters
      .slice()
      .sort((a, b) => a.getHealthPoints() - b.getHealthPoints())
  }

  act(): Promise<any> {
    return new Promise((resolve, reject) => {
      for (let enemy in this.state.enemies) {
        this.state.enemies[enemy].attack(this.getTargets()[0])
      }
      resolve(null);
    })
  }
}