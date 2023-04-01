import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import config from "../config/spritesGameConfig";
import { Sprite } from "@pixi/sprite";
import { getRandomItem } from "../utils/getRandomItem";
import { Layout } from "@pixi/layout";
import { Container } from "@pixi/display";

export class SpritesGame extends Layout implements IGame { 
    constructor(scene: AppScreen) {
        super({
            content: new Container(),
            styles: {
                position: 'center',
                maxWidth: '90%',
                maxHeight: '90%',
            }
        });

        scene.addChild(this);

        this.createSprites(config.spritesCount);
    }

    private createSprites(count: number) {
        for (let i = 0; i < count; i++) {
            const texture = getRandomItem(config.spritesPull);
            const sprite = Sprite.from(texture);

            sprite.x = i;
            sprite.y = i;

            this.innerView.addChild(sprite);
        }
    }

    get innerView(): Container { 
        return this.children[0] as Container;
    }

    public update() { 
        // update game
    }
}