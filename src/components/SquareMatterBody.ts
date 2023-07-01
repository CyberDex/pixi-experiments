import { IMatter } from './IMatter';
import { Bodies, Body, Composite, IChamferableBodyDefinition } from 'matter-js';
import { Graphics } from '@pixi/graphics';
import { ColorSource } from '@pixi/core';

export class SquareMatterBody extends Graphics implements IMatter {
    body!: Body;

    constructor(
        world: Composite,
        params: {
            x: number;
            y: number;
            width: number;
            height: number;
            color: ColorSource;
        },
        options?: IChamferableBodyDefinition,
    ) {
        super();

        const { x, y, width, height, color } = params;

        this.body = Bodies.rectangle(x, y, width, height, options);
        Composite.add(world, this.body);

        this.beginFill(color).drawRect(-width / 2, -height / 2, width, height);
    }

    update() {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.rotation = this.body.angle;
    }

    beforeUnload() {}

    resetPosition() {
        Body.setPosition(this.body, { x: 0, y: 0 });
        Body.setVelocity(this.body, { x: 0, y: 0 });
        Body.setAngularVelocity(this.body, 0);
    }
}
