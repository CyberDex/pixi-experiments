import { Assets, ResolverAssetsArray } from "@pixi/assets";
import { assetsManifest } from "../config/assets";
import { ISpritesheetData } from '@pixi/spritesheet';
import { Spritesheet } from '@pixi/spritesheet';
import { BaseTexture } from "@pixi/core";


/** Initialize and start background loading of all assets */
export async function initAssets() {
    // Init PixiJS assets with this asset manifest
    await Assets.init({ manifest: assetsManifest });

    // Load assets for the load screen
    await Assets.loadBundle('preload');

    // List all existing bundles names
    const allBundles = assetsManifest.bundles.map((item) => item.name);

    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
}

export function isBundleLoaded(bundle: string) {
    const bundleManifest = assetsManifest.bundles.find((b) => b.name === bundle);

    if (!bundleManifest) {
        return false;
    }

    for (const asset of bundleManifest.assets as ResolverAssetsArray) {
        if (!Assets.cache.has(asset.name as string)) {
            return false;
        }
    }

    return true;
}

export function areBundlesLoaded(bundles: string[]) {
    for (const name of bundles) {
        if (!isBundleLoaded(name)) {
            return false;
        }
    }

    return true;
}

export async function initEmojis() {
    const emojiData: ISpritesheetData = {
        frames: {
            emoji1: {
                frame: {
                    x: 0,
                    y: 0,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji2: {
                frame: {
                    x: 200,
                    y: 0,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji3: {
                frame: {
                    x: 0,
                    y: 200,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji4: {
                frame: {
                    x: 200,
                    y: 200,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji5: {
                frame: {
                    x: 0,
                    y: 400,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji6: {
                frame: {
                    x: 200,
                    y: 400,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji7: {
                frame: {
                    x: 0,
                    y: 600,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji8: {
                frame: {
                    x: 200,
                    y: 600,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji9: {
                frame: {
                    x: 0,
                    y: 800,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji10: {
                frame: {
                    x: 200,
                    y: 800,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji11: {
                frame: {
                    x: 0,
                    y: 1000,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji12: {
                frame: {
                    x: 200,
                    y: 1000,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji13: {
                frame: {
                    x: 0,
                    y: 1200,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji14: {
                frame: {
                    x: 200,
                    y: 1200,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji15: {
                frame: {
                    x: 0,
                    y: 1400,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            emoji16: {
                frame: {
                    x: 200,
                    y: 1400,
                    w: 200,
                    h: 200
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            }
        },
        meta: {
            scale: "1"
        }
    };
    
    

        const spritesheet = new Spritesheet(
            BaseTexture.from('emoji'),
            emojiData
        );

        await spritesheet.parse();
}
