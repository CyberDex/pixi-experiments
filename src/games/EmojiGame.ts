import { Container } from "@pixi/display";
import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";

export class EmojiGame extends Container implements IGame {
    progress = '0%';
    activated = false;
    
    constructor(scene: AppScreen) {
        super();
        scene.addChild(this);
    }

    public update() { 
        // update game
    }
}