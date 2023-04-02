import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import config from "../config/fireGameConfig";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Assets } from "@pixi/assets";
import { fireParticleConfig } from "../config/fireParticleConfig";

export class FireGame extends GameBase implements IGame {
    private emitter!: Emitter;
    private elapsed: number = 0;

    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        Assets.loadBundle('fire');

        this.emitter = new Emitter(
            this,
            fireParticleConfig
        );

        this.elapsed = Date.now();
        
        this.emitter.emit = true;

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
        const now = Date.now();
        this.emitter.update((now - this.elapsed) * 0.001);
        
        this.elapsed = now;
    }
    
    resize(width: number, height: number): void {
        this.x = width / 2;
        this.y = height;
    }
}