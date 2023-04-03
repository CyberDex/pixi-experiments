import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";
import { getRandomInRange, getRandomItem } from "../utils/random";
import config from "../config/emojiGameConfig";
import { Container } from "@pixi/display";
import { FancyText, FancyTextOptions } from "../components/FancyText";
import { initEmojis } from "../utils/preload";
import { BitmapFont } from "@pixi/text-bitmap";
import Matter from 'matter-js';
import { app } from "../main";

const combinations = [ '000', '001', '010', '011', '100', '101', '110', '111' ];

export class EmojiGame extends GameBase implements IGame {
    private _widthCache = 0;
    private _heightCache = 0;
    
    engine!: Matter.Engine;
    items: FancyText[] = [];
    innerView!: Container;
    paused = false;
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() {
        await initEmojis();
        
        this.engine = Matter.Engine.create();
        Matter.Events.on(this.engine, 'collisionStart', (event) => this.onCollision(event));
        
        BitmapFont.from('DO', {
            fill: 'white',
            fontSize: 24,
            fontFamily: 'Days One',
            stroke: 'black',
            strokeThickness: 4,
            wordWrap: true,
        });

        this.activated = true;

        this.innerView = new Container();
        this.addChild(this.innerView);

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

    private findSpriteWithRigidbody(rb: Matter.Body) {
        return this.items.find((items) => items.rigidBody === rb)
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

        this.innerView.addChild(text);

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

    private onCollision(event: Matter.IEventCollision<Matter.Engine>) {
        let collision = event.pairs[0]
        let [bodyA, bodyB] = [collision.bodyA, collision.bodyB]
        // console.log(`${bodyA.label} ${bodyA.id} hits ${bodyB.label} ${bodyA.id}`)
        if (bodyA.label === "Coin" && bodyB.label === "Player") {
            let element = this.findSpriteWithRigidbody(bodyA)
            if (element) this.removeElement(element)
        }
        if (bodyA.label === "Player" && bodyB.label === "Coin") {
            let element = this.findSpriteWithRigidbody(bodyB)
            if (element) this.removeElement(element)
        }
    } 

    private removeElement(element: FancyText) {
        element.beforeUnload()
        Matter.Composite.remove(this.engine.world, element.rigidBody)                           // stop physics simulation
        app.stage.removeChild(element)                                                    // stop drawing on the canvas
        this.items = this.items.filter((el: FancyText) => el != element)      // stop updating
        // console.log(`Removed id ${element.id}. Elements left: ${this.elements.length}`)
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

        this.x = (width - config.width) / 2;
        this.y = (height - config.height) / 2;
    }
}