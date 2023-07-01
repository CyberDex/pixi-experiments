import { IMatter } from './IMatter';
import { Bodies, Body, Composite, IChamferableBodyDefinition } from 'matter-js';
import { Graphics } from '@pixi/graphics';

export class SquareMatterBody extends Graphics implements IMatter {
    body!: Matter.Body;

    constructor(
        world: Composite,
        params: {
            x: number;
            y: number;
            width: number;
            height: number;
        },
        options?: IChamferableBodyDefinition,
    ) {
        super();

        const { x, y, width, height } = params;

        this.body = Bodies.rectangle(x, y, width, height, {
            isStatic: false,
            label: 'Ground',
            density: 1,
            friction: 1,
            ...options,
        });
        Composite.add(world, this.body);

        this.beginFill(0xffffff).drawRect(0, 0, width, height);
    }

    beforeUnload() {}

    update() {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.rotation = this.body.angle;
    }

    resetPosition() {
        Body.setPosition(this.body, { x: 120, y: 30 });
        Body.setVelocity(this.body, { x: 0, y: 0 });
        Body.setAngularVelocity(this.body, 0);
    }
}
