import { Container } from "@pixi/display";
import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";

export class FireGame extends Container implements IGame {
    constructor(scene: AppScreen) {
        super();
        scene.addChild(this);
    }

    public update() { 
        // update game
    }
}