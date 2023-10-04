import { Assets, ResolverManifest } from 'pixi.js';

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
  constructor(manifest: ResolverManifest) {
    Assets
      .init({ manifest })
  }

  load(bundle: string | Array<string>): Promise<any> {
    return Assets.loadBundle(bundle, (progress: number) => {
      console.log(`Bundle: ${bundle} loading progress is: ${progress}`)
    });
  }
}