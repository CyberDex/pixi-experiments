import { AppScreen } from '../components/basic/AppScreen';
import { IGame } from './IGame';
import { GameBase } from './GameBase';
import { getRandomInRange, getRandomItem } from '../utils/random';
import { FancyText, FancyTextOptions } from '../components/FancyText';
import { initEmojis } from '../utils/preload';
import { BitmapFont } from '@pixi/text-bitmap';
import { Bottom } from '../components/Bottom';
import { IMatter } from '../components/IMatter';
import config from '../config/emojiGameConfig';
import Matter from 'matter-js';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';
import { Body } from '../components/Body';
import { Graphics } from '@pixi/graphics';
import { Container } from '@pixi/display';

const combinations = ['000', '001', '010', '011', '100', '101', '110', '111'];

export class EmojiGame extends GameBase implements IGame {
    private _widthCache = 0;
    private _heightCache = 0;

    box: Graphics = new Graphics();

    bottom!: Bottom;
    engine: Matter.Engine;
    items: Body[] = [];
    paused = false;
    activated = false;

    constructor(scene: AppScreen) {
        super({});

        this.addChild(this.box);
        this.box.beginFill(0x000000).drawRect(0, 0, 700, 700);
        this.box.x = -this.box.width / 2;
        this.box.y = -this.box.height / 2;

        scene.addChild(this);
        this.engine = Matter.Engine.create();
    }

    async init() {
        await initEmojis();

        BitmapFont.from('DO', {
            fill: 'white',
            fontSize: 24,
            fontFamily: 'Days One',
            stroke: 'black',
            strokeThickness: 4,
            wordWrap: true,
        });

        // this.bottom = new Bottom('pixi-logo', this);
        // this.items.push(this.bottom);
        // this.box.addChild(this.bottom);

        // this.bottom.y = this.box.height - this.bottom.height;
        // this.bottom.width = this.box.width;

        const rectangle = new Body(this);
        rectangle.init(
            'rectangle',
            {
                x: 0,
                y: 0,
                width: 100,
                height: 25,
            },
            {
                // isStatic: true,
            },
        );
        this.items.push(rectangle);
        this.addItem(rectangle);

        const rectangle1 = new Body(this);
        rectangle1.init(
            'rectangle',
            {
                x: 80,
                y: 100,
                width: 100,
                height: 25,
            },
            {
                isStatic: true,
            },
        );
        this.items.push(rectangle1);
        this.addItem(rectangle1);

        // const circle = new Body(this);
        // circle.init('circle', {
        //     x: 100,
        //     y: 100,
        //     width: 50,
        //     height: 50,
        // });
        // this.items.push(circle);
        // this.addItem(circle);

        this.resize(this._widthCache, this._heightCache);

        this.activated = true;

        this.start();
    }

    private addItem(item: Body) {
        this.items.push(item);
        this.box.addChild(item);
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
        };
    }

    update() {
        Matter.Engine.update(this.engine, 1000 / 60);
        this.items.forEach((item) => item.update());
    }

    private addText() {
        if (this.paused) return;

        const text = new FancyText({
            ...this.generateText(),
            style: {
                fontName: 'DO',
                fontSize: getRandomInRange(10, 25),
            },
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

    private addBody() {
        const body = new Body(this);
        body.init(getRandomItem(['rectangle', 'circle']), {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        });
        this.box.addChild(body);

        this.items.push(body);

        // setTimeout(() => this.addBody(), config.repeatDelay * 1000);
    }

    start() {
        // this.addText();
        // this.addBody();
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

        // if (this.bottom) {
        //     const y = (height - this.bottom.height) / 2;

        //     this.bottom.position.set(0, y);
        //     this.bottom.body = Matter.Bodies.rectangle(
        //         0,
        //         y,
        //         window.innerWidth,
        //         this.bottom.height,
        //         { isStatic: true, label: 'Ground' },
        //     );

        //     this.bottom.width = window.innerWidth;
        // }
    }
}
