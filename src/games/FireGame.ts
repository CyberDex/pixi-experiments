import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import { Quality, fireConfig } from "../config/fireGameConfig";
import { Emitter } from "@pixi/particle-emitter";
import { Assets } from "@pixi/assets";
import { TilingSprite } from "@pixi/sprite-tiling";
import { Texture } from "@pixi/core";
import { app } from "../main"

export class FireGame extends GameBase implements IGame {
    private emitter!: Emitter;
    private elapsed: number = 0;
    private tint!: TilingSprite;
    private quality: Quality = 'low';
    private safeQuality!: Quality;
    private fps: {
        low: number;
        high: number;
    } = {
        low: 0,
        high: 0,
    };

    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        Assets.loadBundle('fire');

        this.addViews();

        this.start();
    }

    private addViews() { 
        this.tint = new TilingSprite(
            Texture.from('pixi-logo'),
            200,
            200);
        
        this.addChild(this.tint);
    }

    private bern() { 
        this.createEmitter(this.quality);
        
        this.elapsed = Date.now();
        
        this.emitter.emit = true;
    }

    private createEmitter(quality: Quality) {
        this.quality = quality;

        // TODO: update emitter settings without destroy
        if (this.emitter) {
            this.emitter.destroy();
        }

        this.emitter = new Emitter(
            this,
            fireConfig(window.innerWidth, quality)
        );
    }

    private qualityDown() {
        if (this.quality === 'low') { 
            return;
        } else if (this.quality === 'medium') {
            this.quality = 'low';
        } else if (this.quality === 'high') {
            this.quality = 'medium';
        }

        console.log('quality', this.quality);

        this.safeQuality = this.quality;

        this.fps.low = 0;

        this.createEmitter(this.quality);
    }

    private qualityUp() {
        if (this.quality === 'high') { 
            return;
        } else if (this.quality === 'low') {
            this.quality = 'medium';
        } else if (this.quality === 'medium') {
            this.quality = 'high';
        }

        console.log('quality', this.quality);

        this.fps.high = 0;
        
        this.createEmitter(this.quality);
    }

    // TODO: improve quality adjust, use more frequency & maxParticles states
    private adjustQuality() {
        // console.log(this.fps, this.quality);
        
        if (this.quality !== 'low' && app.ticker.FPS < 60) { 
            this.fps.low++;

            if (this.fps.low > 10) {
                this.qualityDown();
            }
        }

        if (this.safeQuality) { 
            return;
        }

        if (this.quality !== 'high') {
            if (app.ticker.FPS && app.ticker.FPS > 100) {
                this.fps.high++;

                if (this.fps.high > 300) {
                    this.qualityUp();
                }
            }
        }
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

        this.adjustQuality();

        this.elapsed = now;
    }
    
    resize(width: number, height: number): void {
        this.x = 0;
        this.y = height;

        this.createEmitter(this.quality);
    }
}