import { Application, Graphics } from "pixi.js";
import { ContentLoader } from "../../Loader/Loader";
import { Scene } from "../../Components/Scene/Scene";
import { InputSystem } from "../../utils/keyboard";


export class Overworld extends Scene {
  bundle = 'overworld';

  constructor() {
    super();
  }

  setup(): void {
    const graphic = new Graphics();
    this.addChild(graphic)
  }

  init(
    app: Application,
    sceneSwitcher: any,
    input: InputSystem,
    loader: ContentLoader
  ) {
    super.init(app, sceneSwitcher, input, loader);
  }

  update(delta: number): void {
  }
}