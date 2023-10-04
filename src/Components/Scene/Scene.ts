import { Application, Container } from "pixi.js";
import { ContentLoader } from "../../Loader/Loader";
import { InputSystem } from "../../utils/keyboard";

export abstract class Scene extends Container {
  protected app: Application;
  protected sceneSwitcher: any;
  protected input: InputSystem;
  protected loader: ContentLoader;
  protected loaded: boolean;

  bundle = ""
  loadedResources: any = null;

  constructor() {
    super();
  }

  init(
    app: Application,
    sceneSwitcher: any,
    input: InputSystem,
    loader: ContentLoader
  ) {
    this.app = app;
    this.sceneSwitcher = sceneSwitcher;
    this.input = input;
    this.loader = loader;
    this.app.stage.addChild(this);
  }

  load(): Promise<void> {
    return this
      .loader
      .load(this.bundle)
      .then((resources) => {
        this.loadedResources = resources;
      });
  }

  setup() {
    throw new Error('Method not implemented.');
  }


  update(delta: number) {
    throw new Error('Method not implemented.');
  }

  setFinalizing(arg0: () => void) {
    throw new Error('Method not implemented.');
  }
}