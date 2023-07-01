import { IMatter } from '../IMatter';
import { Bodies, Body, Composite, IChamferableBodyDefinition } from 'matter-js';
import { Graphics } from '@pixi/graphics';
import { ColorSource, Ticker } from '@pixi/core';
import { IDestroyOptions } from '@pixi/display';

export class SquareMatterBody extends Graphics implements IMatter {
    body!: Body;

    constructor(
        private world: Composite,
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

        Ticker.shared.add(this.update, this);
    }

    update() {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.rotation = this.body.angle;

        if (this.y - this.height > window.innerHeight) {
            this.destroy();
        }
    }

    destroy(options?: boolean | IDestroyOptions | undefined): void {
        Ticker.shared.remove(this.update, this);
        this.parent?.removeChild(this);
        Composite.remove(this.world, this.body);
        super.destroy(options);
    }

    beforeUnload() {}

    resetPosition() {
        Body.setPosition(this.body, { x: 0, y: 0 });
        Body.setVelocity(this.body, { x: 0, y: 0 });
        Body.setAngularVelocity(this.body, 0);
    }

    setPos(x: number, y: number) {
        Body.setPosition(this.body, { x, y });
    }
}
