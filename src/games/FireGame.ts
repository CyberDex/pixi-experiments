import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import config from "../config/fireGameConfig";
import { FX } from 'revolt-fx';
import { Assets } from "@pixi/assets";
import fx from '../../public/assets/fx.json';
import fxSettings from '../../public/assets/fx-settings.json';

export class FireGame extends GameBase implements IGame {
    private fx!: FX;
    
    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        await Assets.loadBundle('fire');

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
        
        if (this.fx) {
            this.fx.update();
        }
    }
    
    resize(width: number, height: number): void {
        this.x = (width - config.width) / 2;
        this.y = (height - config.height) / 2;
    }
}