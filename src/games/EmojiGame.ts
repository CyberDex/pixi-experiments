import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import { getRandomInRange, getRandomItem } from "../utils/random";
import { FancyText, FancyTextOptions } from "../components/FancyText";
import { initEmojis } from "../utils/preload";
import { BitmapFont } from "@pixi/text-bitmap";
import { Bottom } from "../components/Bottom";
import { IMatter } from "../components/IMatter";
import config from "../config/emojiGameConfig";
import Matter from 'matter-js';

const combinations = [ '000', '001', '010', '011', '100', '101', '110', '111' ];

export class EmojiGame extends GameBase implements IGame {
    private _widthCache = 0;
    private _heightCache = 0;
    
    bottom!: Bottom;
    engine!: Matter.Engine;
    items: IMatter[] = [];
    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        await initEmojis();
        
        this.engine = Matter.Engine.create();
        
        BitmapFont.from('DO', {
            fill: 'white',
            fontSize: 24,
            fontFamily: 'Days One',
            stroke: 'black',
            strokeThickness: 4,
            wordWrap: true,
        });

        this.bottom = new Bottom('pixi-logo', this);
        this.items.push(this.bottom);
        this.addChild(this.bottom);

        this.resize(this._widthCache, this._heightCache);

        this.activated = true;

        this.start();
    }

    private getWord(): string { 
        return getRandomItem(config.words);
    }

    private getEmoji(): string { 
        const type = getRandomInRange(1, config.spritesAmount);
        return `emoji${type}`;
    }

    private generateText(): FancyTextOptions { 
        const parts = getRandomItem(combinations).split('');
        let text = '';
        let images: string[] = [];

        parts.forEach((part: '0' | '1') => { 
            if (part === '0') {
                text += ` ${this.getWord()}`;
            } else {
                const emoji = this.getEmoji();
                
                text += ` ${emoji}`;
                images.push(emoji);
            }
        });
        
        return {
            text,
            images,
            game: this,
        }
    }

    update() {
        if (this.engine) {
            Matter.Engine.update(this.engine, 1000 / 60);

            this.items.forEach((item) => item.update());
        }
    }

    private addText() {
        if (this.paused) return;

        const text = new FancyText({
            ...this.generateText(),
            style: {
                fontName: 'DO',
                fontSize: getRandomInRange(10, 25)
            }
        });
        
        text.x = getRandomInRange(0, Math.min(this._widthCache, config.width));
        text.y = getRandomInRange(0, Math.min(this._heightCache, config.height));

        this.fitText(text);

        this.items.push(text);
        
        text.y -= 10000;

        this.addChild(text);

        setTimeout(() => this.addText(), config.repeatDelay * 1000);
    }

    private fitText(text: FancyText) { 
        const width = Math.min(this._widthCache, config.width);
        const height = Math.min(this._heightCache, config.height);

        if (text.x + text.width / 2 > width) { 
            text.x = width - text.width / 2;
        }

        if (text.x - text.width / 2 < 0) {
            text.x = text.width / 2;
        }

        if (text.y + text.height / 2 > height) {
            text.y = height - text.height / 2;
        }

        if (text.y - text.height / 2 < 0) {
            text.y = text.height / 2;
        }
    }

    start() {
        this.addText();
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;        
        this.addText();
    }
    
    resize(width: number, height: number): void {
        this._widthCache = width;
        this._heightCache = height;

        this.x = width / 2;
        this.y = height / 2;

        if (this.bottom) {
            const y = (height - this.bottom.height) / 2;

            this.bottom.position.set(0, y);
            this.bottom.rigidBody = Matter.Bodies.rectangle(0, y, window.innerWidth, this.bottom.height, { isStatic: true, label: "Ground" })
            
            this.bottom.width = window.innerWidth;
        }
    }
}