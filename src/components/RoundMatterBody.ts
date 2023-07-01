import { IMatter } from './IMatter';
import { Bodies, Body, Composite, IChamferableBodyDefinition } from 'matter-js';
import { Graphics } from '@pixi/graphics';
import { ColorSource } from '@pixi/core';

export class RoundMatterBody extends Graphics implements IMatter {
    body!: Body;

    constructor(
        world: Composite,
        params: {
            x: number;
            y: number;
            radius: number;
            color?: ColorSource;
        },
        options?: IChamferableBodyDefinition,
    ) {
        super();

        const { x, y, radius, color } = params;

        this.body = Bodies.circle(x, y, radius, {
            isStatic: false,
            density: 1,
            friction: 1,
            ...options,
        });
        Composite.add(world, this.body);

        this.beginFill(color ?? 0xffffff).drawCircle(0, 0, radius);
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
