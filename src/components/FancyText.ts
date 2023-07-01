import { BitmapText, IBitmapTextStyle } from '@pixi/text-bitmap';
import { List } from '@pixi/ui';
import { Sprite } from '@pixi/sprite';
import { app } from '../main';
import { RenderTexture, SCALE_MODES } from '@pixi/core';

export type FancyTextOptions = {
    text: string;
    images?: string[];
    style?: Partial<IBitmapTextStyle>;
};

export class FancyTextTexture {
    private list: List;

    texture: RenderTexture;

    constructor({ images, text, style }: FancyTextOptions) {
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

        this.list = new List({
            type: 'horizontal',
        });

        textData.forEach((data) => {
            const text = new BitmapText(data.text, style);
            this.list.addChild(text);

            if (data.image) {
                const sprite = Sprite.from(data.image);
                sprite.scale.set(text.height / sprite.height);
                this.list.addChild(sprite);
            }
        });

        this.texture = app.renderer.generateTexture(this.list, {
            scaleMode: SCALE_MODES.LINEAR,
            resolution: app.renderer.resolution,
        });
    }
}
