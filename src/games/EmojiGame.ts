import { AppScreen } from '../components/basic/AppScreen';
import { IMatterGame } from './IGame';
import { GameBase } from './GameBase';
import { getRandomInRange, getRandomItem } from '../utils/random';
import { FancyText, FancyTextOptions } from '../components/FancyText';
import { initEmojis } from '../utils/preload';
import { BitmapFont } from '@pixi/text-bitmap';
import config from '../config/emojiGameConfig';
import { Engine, Runner } from 'matter-js';
import { RoundMatterBody } from '../components/RoundMatterBody';
import { SquareMatterBody } from '../components/SquareMatterBody';

const combinations = ['000', '001', '010', '011', '100', '101', '110', '111'];

export class EmojiGame extends GameBase implements IMatterGame {
    private _widthCache = 0;
    private _heightCache = 0;

    engine: Engine;
    paused = false;
    activated = false;

    constructor(scene: AppScreen) {
        super({});

        scene.addChild(this);
        this.engine = Engine.create();
        Runner.run(this.engine);
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

        this.resize(this._widthCache, this._heightCache);

        this.activated = true;

        this.addStaticBodies();

        this.start();
    }

    private addStaticBodies() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distX = 70;
        const distY = 50;
        const size = 10;

        const rowsCount = 11;

        const startY = centerY - (distX * rowsCount) / 2;

        for (let y = 1; y < rowsCount + 1; y++) {
            const startX = centerX - (distX * y) / 2;

            for (let x = 0; x < y + 1; x++) {
                this.addStaticDots(startX + x * distX, startY + y * distY, size);
            }
        }

        const startX = centerX - (distX * rowsCount) / 2;

        for (let x = 0; x < rowsCount + 1; x++) {
            this.addBucket(startX + x * distX, window.innerHeight - 100);
        }

        this.addBottomLine(centerX, window.innerHeight + 24, distX * rowsCount + 1, 50);
    }

    private addStaticDots(x: number, y: number, radius: number) {
        const body = new RoundMatterBody(
            this.engine.world,
            {
                x,
                y,
                radius,
                color: 'black',
            },
            {
                isStatic: true,
            },
        );
        this.addChild(body);
    }

    private addBall() {
        if (this.paused) return;

        const body = new RoundMatterBody(
            this.engine.world,
            {
                x: window.innerWidth / 2 + getRandomInRange(-10, 10),
                y: 0,
                radius: 10,
                color: this.getRandomColor(),
            },
            {
                density: 1,
                restitution: 0.5,
            },
        );
        this.addChild(body);

        setTimeout(() => this.addBall(), config.repeatDelay * 1000);
    }

    private addBucket(x: number, y: number) {
        const left = new SquareMatterBody(
            this.engine.world,
            { x, y, width: 10, height: 200, color: 'black' },
            {
                isStatic: true,
            },
        );
        this.addChild(left);
    }

    private addBottomLine(x: number, y: number, width: number, height: number) {
        const left = new SquareMatterBody(
            this.engine.world,
            { x, y, width, height, color: 'black' },
            {
                isStatic: true,
            },
        );
        this.addChild(left);
    }

    private getRandomColor(): string {
        return getRandomItem(COLORS);
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
        // this.addText();
        this.addBall();
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
    }
}

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'gray'];
