import { AppScreen } from '../components/basic/AppScreen';
import { IMatterGame } from './IGame';
import { GameBase } from './GameBase';
import { getRandomInRange, getRandomItem } from '../utils/random';
import { FancyTextTexture, FancyTextOptions } from '../components/FancyText';
import { initEmojis } from '../utils/preload';
import { BitmapFont } from '@pixi/text-bitmap';
import config from '../config/emojiGameConfig';
import { Engine, Runner } from 'matter-js';
import { SpriteMatterBody } from '../components/basic/SpriteMatterBody';
import { SquareMatterBody } from '../components/basic/SquareMatterBody';

const combinations = ['000', '001', '010', '011', '100', '101', '110', '111'];

export class EmojiGame extends GameBase implements IMatterGame
{
    private _widthCache = 0;
    private _heightCache = 0;

    private bottomLine!: SquareMatterBody;

    engine: Engine;
    paused = false;
    activated = false;

    constructor(scene: AppScreen)
    {
        super({});

        scene.addChild(this);
        this.engine = Engine.create();
        Runner.run(this.engine);
    }

    async init()
    {
        await initEmojis();

        BitmapFont.from('DO', {
            fill: 'white',
            fontSize: 24,
            fontFamily: 'Days One',
            stroke: 'black',
            strokeThickness: 4,
            wordWrap: true,
        });

        this.bottomLine = new SquareMatterBody(
            this.engine.world,
            {
                x: window.innerWidth / 2 - 1000,
                y: window.innerHeight,
                width: window.innerWidth + 2000,
                height: 100,
                color: 0x000000,
            },
            {
                isStatic: true,
            },
        );
        this.addChild(this.bottomLine);

        this.resize(this._widthCache, this._heightCache);

        this.activated = true;

        this.start();
    }

    private getWord(): string
    {
        return getRandomItem(config.words);
    }

    private getEmoji(): string
    {
        const type = getRandomInRange(1, config.spritesAmount);

        return `emoji${type}`;
    }

    private generateText(): FancyTextOptions
    {
        const parts = getRandomItem(combinations).split('');
        let text = '';
        const images: string[] = [];

        parts.forEach((part: '0' | '1') =>
        {
            if (part === '0')
            {
                text += ` ${this.getWord()}`;
            }
            else
            {
                const emoji = this.getEmoji();

                text += ` ${emoji}`;
                images.push(emoji);
            }
        });

        return {
            text,
            images,
        };
    }

    private addText()
    {
        if (this.paused) return;

        const texture = new FancyTextTexture({
            ...this.generateText(),
            style: {
                fontName: 'DO',
                fontSize: getRandomInRange(10, 25),
            },
        }).texture;

        const text = new SpriteMatterBody(this.engine.world, {
            x: getRandomInRange(texture.width / 2, this._widthCache - texture.width / 2),
            y: 0,
            angle: 0.1,
            texture,
        });

        this.addChild(text);

        setTimeout(() => this.addText(), config.repeatDelay * 1000);
    }

    start()
    {
        this.addText();
    }

    pause()
    {
        this.paused = true;
    }

    resume()
    {
        this.paused = false;
        this.addText();
    }

    resize(width: number, height: number): void
    {
        this._widthCache = width;
        this._heightCache = height;

        if (this.bottomLine)
        {
            this.bottomLine.setPos(width / 2, height);
        }
    }
}
