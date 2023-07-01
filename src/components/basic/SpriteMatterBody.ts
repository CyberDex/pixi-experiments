import { IMatter } from '../IMatter';
import { Bodies, Body, Composite, IChamferableBodyDefinition } from 'matter-js';
import { RenderTexture, Ticker } from '@pixi/core';
import { IDestroyOptions } from '@pixi/display';
import { Sprite } from '@pixi/sprite';

export class SpriteMatterBody extends Sprite implements IMatter
{
    body!: Body;
    world: Composite;

    constructor(
        world: Composite,
        params: {
            texture: RenderTexture;
            x: number;
            y: number;
            angle?: number;
        },
        options?: IChamferableBodyDefinition,
    )
    {
        super();

        this.world = world;

        this.anchor.set(0.5);

        const { x, y, texture } = params;

        this.body = Bodies.rectangle(x, y, texture.width, texture.height, options);
        Composite.add(world, this.body);

        this.body.angle = params.angle ?? 0;

        this.texture = texture;

        Ticker.shared.add(this.update, this);
    }

    update()
    {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.rotation = this.body.angle;

        if (this.y - this.height > window.innerHeight)
        {
            this.destroy();
        }
    }

    destroy(options?: boolean | IDestroyOptions | undefined): void
    {
        Ticker.shared.remove(this.update, this);
        this.parent?.removeChild(this);
        Composite.remove(this.world, this.body);
        super.destroy(options);
    }

    beforeUnload() {}

    resetPosition()
    {
        Body.setPosition(this.body, { x: 0, y: 0 });
        Body.setVelocity(this.body, { x: 0, y: 0 });
        Body.setAngularVelocity(this.body, 0);
    }
}
