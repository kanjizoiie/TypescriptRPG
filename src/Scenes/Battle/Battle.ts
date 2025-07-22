import { Application } from "pixi.js";
import { BattleAi } from "../../AI/BattleAi";
import { Character } from "../../Entities/Character";
import { Enemy } from "../../Entities/Enemy";
import { ContentLoader } from "../../Loader/Loader";
import { Menu } from "../../Menu/Menu";
import { Scene } from "../../Components/Scene/Scene";
import { NumberBar } from "../../UI/NumberBar";
import { TextBox } from "../../UI/TextBox";
import { InputSystem } from "../../utils/keyboard";
import RAPIER from "@dimforge/rapier2d";

export interface BattleSceneState {
  battleState: BattleState;
}

export interface BattleState {
  enemies: Array<Enemy>;
  characters: Array<Character>;
}

export interface UIState {
  healthBars: Array<NumberBar>;
}

export class Battle extends Scene {
  private state: BattleSceneState;
  private AI: BattleAi;
  bundle = 'battle';


  constructor() {
    super();
  }

  setup(): void {
    const character = new Character(this.loadedResources.spritesheet)
    this.state = {
      battleState: {
        characters: [],
        enemies: [],
      }
    }
    this.AI = new BattleAi();

    character.position.set(200, 100);
    this.state.battleState.characters.push(character)


    this.addChild(
      ...this.state.battleState.characters,
      ...this.state.battleState.enemies,
    );


    this.playerTurn();
  }

  init(
    app: Application,
    sceneSwitcher: any,
    input: InputSystem,
    loader: ContentLoader,
  ) {
    super.init(app, sceneSwitcher, input, loader);
  }



  playerTurn() {
    console.log("Players turn")
    return new Promise((resolve, reject) => {

    }).then(() => {
      this.enemyTurn();
    })
  }

  enemyTurn() {
    console.log("Enemys turn");
    return new Promise((resolve, reject) => {
      this.AI.setState(this.state.battleState);

      /**
       * Enemy should act.
       */
      this.AI.act()
        .then(() => {
          resolve(null)
        });
    }).then(() => {
      this.playerTurn();
    })
  }

  update(delta: number): void {
    this.state.battleState.enemies.forEach((enemy: Enemy) => {
      enemy.update(delta);
    });


    this.state.battleState.characters.forEach((player: Character) => {
      player.update(delta);
    });
  }
}