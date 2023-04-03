import { Container } from "@pixi/display";
import { BitmapText, IBitmapTextStyle } from '@pixi/text-bitmap';
import { List } from "@pixi/ui";
import { Sprite } from "@pixi/sprite";
import Matter from 'matter-js';
import { IGame } from "../games/IGame";

export type FancyTextOptions = {
    game: IGame,
    text: string,
    images?: string[],
    style?: Partial<IBitmapTextStyle>
}

export class FancyText extends Container {
    private list: List;

    rigidBody!: Matter.Body;
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
            image?: string,
            text: string,
        }[] = []
        
        if (images) {
            let pointer = 0;
            
            images?.forEach((image,) => {
                const index = text.indexOf(image);

                if (index !== -1) {
                    textData.push({
                        image,
                        text: text.slice(pointer, index)
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

        this.rigidBody = Matter.Bodies.rectangle(Math.random() * 900, -30, 60, 60, { label: "Crate" }) //x,y,w,h
        if (this.game.engine) {
            Matter.Composite.add(this.game.engine.world, this.rigidBody)
        }
    }

    beforeUnload() {
        
    }

    update() {       
        this.position.set(this.rigidBody.position.x, this.rigidBody.position.y)
        this.rotation = this.rigidBody.angle
    }

    resetPosition() {
        Matter.Body.setPosition(this.rigidBody, {x:120, y:30})
        Matter.Body.setVelocity(this.rigidBody, {x:0, y:0})
        Matter.Body.setAngularVelocity(this.rigidBody, 0)
    }
}