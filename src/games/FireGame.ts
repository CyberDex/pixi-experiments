import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import config from "../config/fireGameConfig";
import { Assets } from "@pixi/assets";
import { Loader } from '@pixi/loaders';

export class FireGame extends GameBase implements IGame {
    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        await Assets.loadBundle('fire');

        const loader = Loader.shared;
        
        // loader.add('fx_settings', 'assets/default-bundle.json');
        // loader.add('fx_spritesheet', 'assets/revoltfx-spritesheet.json');
        // loader.add('example_spritesheet', 'assets/rfx-examples.json');
        
        // loader.load(function (loader, resources) {

        //         console.log({
        //             loader,
        //             resources
        //         });
                
        //         //Init the bundle
        //         // fx.initBundle(resources.fx_settings.data);

        //         // var content = new PIXI.Container();
        //         // content.x = width * 0.5;
        //         // content.y = height * 0.5;
        //         // app.stage.addChild(content);

        //         // var logo = PIXI.Sprite.from('logo');
        //         // logo.anchor.set(0.5);
        //         // logo.alpha = 0.6;
        //         // content.addChild(logo);

        //         // var emitter = fx.getParticleEmitter('plasma-corona');
        //         // emitter.init(content, true, 1.9);

        //         // app.ticker.add(function (delta) {
        //         //     //Update the RevoltFX instance
        //         //     fx.update(delta);
        //         // });

        //     });
        
        this.start();
    }

    private bern() { 

    }

    start() {
        this.bern();
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
        this.bern();
    }
    
    update() { 
        if (this.paused) return;
        
    }
    
    resize(width: number, height: number): void {
        this.x = (width - config.width) / 2;
        this.y = (height - config.height) / 2;
    }
}