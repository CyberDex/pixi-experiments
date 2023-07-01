import { Texture } from '@pixi/core';
import { TilingSprite } from '@pixi/sprite-tiling';
import { IMatter } from './IMatter';
import { IGame } from '../games/IGame';
import Matter from 'matter-js';

export class Bottom extends TilingSprite implements IMatter {
    body!: Matter.Body;
    game: IGame;

    constructor(pattern: string, game: IGame) {
        const texture = Texture.from(pattern);

        super(texture, window.innerWidth / 2, texture.height);

        this.game = game;

        this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, {
            isStatic: false,
            label: 'Ground',
        });

        Matter.Composite.add(this.game.engine.world, this.body);
    }

    beforeUnload() {}

    update() {}

    resetPosition() {
        Matter.Body.setPosition(this.body, {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
        });
    }
}
