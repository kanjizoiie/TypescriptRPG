import { FPSCounter } from '../Components/FPSCounter/FPSCounter';
import { ContentLoader, manifest } from '../Loader/Loader';
import { InputSystem } from '../utils/keyboard';
import { Application, TextStyle } from 'pixi.js';
import { Scene } from '../Components/Scene/Scene';
import { Battle } from '../Scenes/Battle/Battle';
import { Overworld } from '../Scenes/Overworld/Overworld';
import { Graph } from '../Components/Graph/Graph';
import { Grid } from '../Components/Grid/Grid';

export interface SceneSettings {
  index: number;
  name?: string,
  gameScene: Scene;
}

export class Engine {
  private fpsCounter: FPSCounter;
  private graph: Graph;

  private app: Application;
  private input: InputSystem;
  private loader: ContentLoader;

  private sceneSettings: Array<SceneSettings> = [
    {
      index: 0,
      gameScene: new Overworld()
    }, {
      index: 1,
      gameScene: new Battle()
    }];
  private currentScene: SceneSettings;


  constructor(ref: HTMLDivElement) {
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
    });

    this.input = new InputSystem();
    this.loader = new ContentLoader(manifest);

    this.loader.load('ui');
    this.sceneSettings.forEach(
      (sceneSettings: SceneSettings) => {
        sceneSettings.gameScene.init(
          this.app,
          this.sceneSwitcher,
          this.input,
          this.loader,
        );
      });

    this.currentScene = this.sceneSettings[0];
    this.setupScene(this.currentScene);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        console.log('Stopping ticker as page is not visible!');
        if (this.app) this.app.ticker.stop();
      } else {
        console.log('Starting ticker as page is visible!');
        if (this.app) this.app.ticker.start();
      }
    }, false);

    ref.appendChild(this.app.view as HTMLCanvasElement);

    this.app.ticker.add((delta) => this.update(delta));
    this.fpsCounter = new FPSCounter(this.app.ticker);
    this.graph = new Graph(this.app.ticker)
    this.graph.setTransform(2, 64)
    this.app.stage.addChild(this.fpsCounter, this.graph);
  }

  sceneSwitcher = (sceneName: string) => {
    if (sceneName === this.currentScene.name) return;
    this
      .currentScene
      .gameScene
      .setFinalizing(() => {
        const scene = this.sceneSettings.find(
          (sceneSettings) => {
            return sceneSettings.name === sceneName;
          }
        );

        if (scene) {
          this.currentScene = scene;
          this.setupScene(scene);
        } else {
          console.error("SCENE NOT FOUND: " + sceneName);
        }
      });
  }

  setupScene(scene: SceneSettings) {
    this.app.stage.removeChildren();
    this.app.stage.addChild(scene.gameScene);

    /**
     * Load files, then setup, and start ticker for scene.
     */
    scene
      .gameScene
      .load()
      .then(() => {
        scene
          .gameScene
          .setup();
        this.app.ticker.add((delta: number) => { scene.gameScene.update(delta) });
      });
  }

  update(delta: number): any {
    this.fpsCounter.update(delta);
    this.graph.update(delta);
  }
}

