import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import { GameBase } from "./GameBase";

export class FireGame extends GameBase implements IGame {
    progress = '0%';
    activated = false;
    
    constructor(scene: AppScreen) {
        super({});
        scene.addChild(this);
    }

    async init() { }
    update() { }
    start() { }
    pause() { }
    resume() { }
}