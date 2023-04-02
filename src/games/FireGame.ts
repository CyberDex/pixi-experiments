import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import config from "../config/fireGameConfig";
import { Filter } from "@pixi/core";
import { Sprite } from "@pixi/sprite";
import { shader } from "./shader";

export class FireGame extends GameBase implements IGame {
    private filter!: Filter;

    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        this.start();
    }

    private bern() { 
        const uniforms = {
            resolution: {
                type: '2f',
                value: {
                x: window.innerWidth,
                y: window.innerHeight,
                },
            },
            alpha: {
                type: '1f',
                value: 1,
            },
            shift: {
                type: '1f',
                value: 1.6,
            },
            time: {
                type: '1f',
                value: 0,
            },
            speed: {
                type: '2f',
                value: {
                x: 0.7,
                y: 0.4,
                },
            },
        };
        
        this.filter = new Filter(undefined, shader, uniforms);

        const bg = Sprite.from('https://s3-us-west-2.amazonaws.com/s.cdpn.io/167451/test_BG.jpg');
        
        bg.filters = [this.filter];
        this.addChild(bg);
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
        
        const timestamp = Date.now();
        this.filter.uniforms.time.value = timestamp / 1000;
        this.filter.syncUniforms();
    }
    
    resize(width: number, height: number): void {
        this.x = (width - config.width) / 2;
        this.y = (height - config.height) / 2;
    }
}