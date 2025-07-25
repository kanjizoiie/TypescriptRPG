import { Application, Graphics } from "pixi.js";
import { ContentLoader } from "../../Loader/Loader";
import { Scene } from "../../Components/Scene/Scene";
import { InputSystem } from "../../utils/keyboard";


export class Overworld extends Scene {
  bundle = 'overworld';
  world: any;

  constructor() {
    super();

    import('@dimforge/rapier2d').then(RAPIER => {
      // Use the RAPIER module here.
      let gravity = { x: 0.0, y: -9.81 };
      let world = new RAPIER.World(gravity);

      // Create the ground
      let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1);
      world.createCollider(groundColliderDesc);

      // Create a dynamic rigid-body.
      let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0.0, 1.0);
      let rigidBody = world.createRigidBody(rigidBodyDesc);

      // Create a cuboid collider attached to the dynamic rigidBody.
      let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5);
      let collider = world.createCollider(colliderDesc, rigidBody);

      // Game loop. Replace by your own game loop system.
      let gameLoop = () => {
        // Step the simulation forward.  
        world.step();

        // Get and print the rigid-body's position.
        let position = rigidBody.translation();
        console.log("Rigid-body position: ", position.x, position.y);

        setTimeout(gameLoop, 16);
      };

      gameLoop();
    })
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