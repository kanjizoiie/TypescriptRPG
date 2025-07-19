import * as PIXI from 'pixi.js';
// Manifest Example
export const manifest = {
  bundles: [
    {
      name: 'ui',
      assets: [
        {
          name: 'font',
          srcs: 'fonts/PressStart2P.ttf',
        },
      ]
    },
    {
      name: 'battle',
      assets: [
        {
          name: 'spritesheet',
          srcs: 'assets/data.json',
        },
      ],
    },
  ]
};


export class ContentLoader {
  constructor(manifest: any) {
    PIXI.Assets.init({ manifest });
  }

  load(bundle: string | Array<string>): Promise<any> {
    return PIXI.Assets.loadBundle(bundle, (progress: number) => {
      console.log(`Bundle: ${bundle} loading progress is: ${progress}`);
    });
  }
}