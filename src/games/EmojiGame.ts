import { AppScreen } from '../components/basic/AppScreen';
import { IMatterGame } from './IGame';
import { GameBase } from './GameBase';
import { getRandomInRange, getRandomItem } from '../utils/random';
import { FancyText, FancyTextOptions } from '../components/FancyText';
import { initEmojis } from '../utils/preload';
import { BitmapFont } from '@pixi/text-bitmap';
import config from '../config/emojiGameConfig';
import { Engine } from 'matter-js';
import { SquareMatterBody } from '../components/SquareMatterBody';

const combinations = ['000', '001', '010', '011', '100', '101', '110', '111'];

export class EmojiGame extends GameBase implements IMatterGame {
    private _widthCache = 0;
    private _heightCache = 0;

    engine: Engine;
    items: SquareMatterBody[] = [];
    paused = false;
    activated = false;

    private bottom!: SquareMatterBody;

    constructor(scene: AppScreen) {
        super({});

        scene.addChild(this);
        this.engine = Engine.create();
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

        this.bottom = new SquareMatterBody(
            this.engine.world,
            {
                x: 0,
                y: window.innerHeight,
                width: window.innerWidth,
                height: 100,
            },
            {
                isStatic: true,
            },
        );
        this.addItem(this.bottom);

        this.resize(this._widthCache, this._heightCache);

        this.activated = true;

        this.start();
    }

    private addItem(item: SquareMatterBody) {
        this.items.push(item);
        this.addChild(item);
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
        Engine.update(this.engine, 1000 / 60);
        this.items.forEach((item) => item.update());
    }

    private addBody() {
        if (this.paused) return;

        const width = getRandomInRange(30, 100);
        const height = getRandomInRange(30, 100);

        const rectangle = new SquareMatterBody(
            this.engine.world,
            {
                x: getRandomInRange(0, 200),
                y: 0,
                width,
                height,
            },
            {
                // isStatic: true,
            },
        );
        this.addItem(rectangle);

        setTimeout(() => this.addBody(), config.repeatDelay * 1000);
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
        text.y -= 10000;

        this.addItem(text);

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
        // this.addText();
        this.addBody();
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

        // if (this.bottom) {
        //     this.bottom.y = window.innerHeight - this.bottom.height;
        //     this.bottom.width = window.innerWidth;
        // }
    }
}
