import { Container } from '@pixi/display';
import { BitmapText, IBitmapTextStyle } from '@pixi/text-bitmap';
import { List } from '@pixi/ui';
import { Sprite } from '@pixi/sprite';
import Matter from 'matter-js';
import { IGame } from '../games/IGame';
import { IMatter } from './IMatter';
import { getRandomInRange } from '../utils/random';
import { Texture } from '@pixi/core';

export type FancyTextOptions = {
    game: IGame;
    text: string;
    images?: string[];
    style?: Partial<IBitmapTextStyle>;
};

export class FancyText extends Container implements IMatter {
    private list: List;

    body!: Matter.Body;
    game: IGame;

    constructor(options: FancyTextOptions) {
        super();

        this.game = options.game;

        this.list = new List({
            type: 'horizontal',
        });
        this.addChild(this.list);

        this.init(options);
    }

    init({ images, text, style }: FancyTextOptions) {
        const textData: {
            image?: string;
            text: string;
        }[] = [];

        if (images) {
            let pointer = 0;

            images?.forEach((image) => {
                const index = text.indexOf(image);

                if (index !== -1) {
                    textData.push({
                        image,
                        text: text.slice(pointer, index),
                    });

                    text = text.replace(image, '');
                }

                pointer = index;
            });

            if (pointer < text.length) {
                textData.push({ text: text.slice(pointer) });
            }
        }

        textData.forEach((data) => {
            const text = new BitmapText(data.text, style);
            this.list.addChild(text);

            if (data.image) {
                const sprite = Sprite.from(data.image);
                sprite.scale.set(text.height / sprite.height);
                this.list.addChild(sprite);
            }
        });

        const bg = Sprite.from(Texture.WHITE);
        bg.width = this.width;
        bg.height = this.height;

        this.addChild(bg);

        this.body = Matter.Bodies.rectangle(
            getRandomInRange(-600, 600) - this.width / 2,
            -1000 - this.height / 2,
            this.height,
            this.width,
            {
                friction: 0.00001,
                restitution: 0.5,
                density: 0.001,
                label: 'text',
            },
        );
        if (this.game.engine) {
            Matter.Composite.add(this.game.engine.world, this.body);
        }
    }

    beforeUnload() {}

    update() {
        this.position.set(this.body.position.x, this.body.position.y);
        this.rotation = this.body.angle;

        if (this.game.engine && this.body.position.y > window.innerHeight + 1000) {
            Matter.World.remove(this.game.engine.world, this.body);
            this.destroy({ children: true });
        }
    }

    resetPosition() {
        Matter.Body.setPosition(this.body, { x: 120, y: 30 });
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(this.body, 0);
    }
}
