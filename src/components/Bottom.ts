import { Texture } from "@pixi/core";
import { TilingSprite } from "@pixi/sprite-tiling";
import { IMatter } from "./IMatter";
import { IGame } from "../games/IGame";
import Matter from "matter-js";

export class Bottom extends TilingSprite implements IMatter{
    rigidBody!: Matter.Body;
    game: IGame;

    constructor(pattern: string, game: IGame) {
        const texture = Texture.from(pattern);

        super(texture, window.innerWidth, texture.height);

        this.game = game;

        this.anchor.set(0.5);

        this.rigidBody = Matter.Bodies.rectangle(0, this.x, window.innerWidth, texture.height, { isStatic: true, label: "Ground" });
        
        if (this.game.engine) {
            Matter.Composite.add(this.game.engine.world, this.rigidBody)
        }
    }


    beforeUnload() {
        
    }

    update() {       
    }

    resetPosition() {
        Matter.Body.setPosition(this.rigidBody, {x:120, y:30})
        Matter.Body.setVelocity(this.rigidBody, {x:0, y:0})
        Matter.Body.setAngularVelocity(this.rigidBody, 0)
    }
}