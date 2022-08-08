import React from 'react';
import * as PIXI from 'pixi.js';
import { FPSCounter } from '../FPSCounter/FPSCounter';
import { Player } from '../Entities/Player';
import { load } from '../Loader/Loader';
import { UI } from '../UI/UI';
import { InputSystem } from '../utils/keyboard';

export interface ApplicationProps {
  children: React.ReactNode,
}

export class Game {
  fpsCounter: FPSCounter = new FPSCounter();
  application: PIXI.Application;
  player: Player;
  ui: UI;

  keyboard: InputSystem;

  constructor(ref: HTMLDivElement) {
    this.application = new PIXI.Application({
      width: 1280,
      height: 860,
      backgroundColor: 0x000000,
    });

    const is = new InputSystem();
    is.registerKeyboardAction("w", {
      keydown: (event) => this.ui.battleMenu.setSelected(this.ui.battleMenu.getSelected() - 1)
    });

    is.registerKeyboardAction("s", {
      keydown: (event) => this.ui.battleMenu.setSelected(this.ui.battleMenu.getSelected() + 1)
    });

    is.registerKeyboardAction("f", {
      keydown: (event) => this.ui.battleMenu.select()
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        console.log('Stopping ticker as page is not visible!');
        if (this.application) this.application.ticker.stop();
      } else {
        console.log('Starting ticker as page is visible!');
        if (this.application) this.application.ticker.start();
      }
    }, false);

    load(({ spriteSheet }) => {
      this.player = new Player();
      this.player.setup(spriteSheet);
      this.player.update(this.application);
      this.player.draw(this.application.stage);
    });

    this.fpsCounter.update(this.application);
    this.fpsCounter.draw(this.application.stage);

    this.ui = new UI(1280, 860 / 3);
    this.ui.setPosition(0, 500);
    this.ui.draw(this.application.stage);



    ref.appendChild(this.application.view);
  }
}

