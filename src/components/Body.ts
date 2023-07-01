import { IMatter } from './IMatter';
import { IGame } from '../games/IGame';
import Matter, { Composite } from 'matter-js';
import { Graphics } from '@pixi/graphics';

type BodyType = 'rectangle' | 'circle';

export class Body extends Graphics implements IMatter {
    body!: Matter.Body;
    game: IGame;

    constructor(game: IGame) {
        super();

        this.game = game;
    }

    init(
        type: BodyType,
        params: {
            x: number;
            y: number;
            width: number;
            height: number;
        },
        options?: Matter.IChamferableBodyDefinition | undefined,
    ) {
        const { x, y, width, height } = params;

        switch (type) {
            case 'rectangle':
                this.body = Matter.Bodies.rectangle(x, y, width, height, {
                    isStatic: false,
                    label: 'Ground',
                    ...options,
                });
                Composite.add(this.game.engine.world, this.body);

                this.beginFill(0xffffff).drawRect(0, 0, width, height);
                break;
            case 'circle':
                this.body = Matter.Bodies.circle(x, y, width / 2, {
                    isStatic: false,
                    label: 'Ground',
                    ...options,
                });
                Composite.add(this.game.engine.world, this.body);

                this.beginFill(0xffffff).drawCircle(x - width / 4, y - width / 4, width / 2);
                break;
        }
    }

    beforeUnload() {}

    update() {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.rotation = this.body.angle;

        if (this.body.position.y > this.game.box.height) {
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
