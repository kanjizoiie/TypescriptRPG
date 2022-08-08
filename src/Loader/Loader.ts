import * as PIXI from 'pixi.js';
import { AnimatedSprite, Spritesheet } from 'pixi.js';

const loader = PIXI.Loader.shared;

const load = (completeCallback: (resources: { spriteSheet?: Spritesheet }) => void) => {
  const loadedResources: { spriteSheet?: Spritesheet } = {};

  // Chainable `add` to enqueue a resource
  loader
    .add('spritesheet_atlas', 'assets/data.json')
    .add('font', 'assets/PressStart2P.ttf');
  // The `load` method loads the queue of resources, and calls the passed in callback called once all
  // resources have loaded.

  // throughout the process multiple signals can be dispatched.
  loader.onError.add((error, resource) => { console.error(error) }); // called once per errored file
  loader.onLoad.add((loader, resource) => { console.log(`Resource: ${resource.name} Finished!`) }); // called once per loaded file

  loader
    .load((loader, resources) => {
      loadedResources.spriteSheet = resources.spritesheet_atlas.spritesheet;
      completeCallback(loadedResources);
    });

}
export { load };