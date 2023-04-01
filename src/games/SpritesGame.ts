import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import config from "../config/spritesGameConfig";
import { Sprite } from "@pixi/sprite";
import { getRandomItem, randomInRange } from "../utils/random";
import { Layout } from "@pixi/layout";
import { Container } from "@pixi/display";
import { Elastic, gsap } from "gsap";

export class SpritesGame extends Layout implements IGame { 
    private stack1: Container = new Container();
    private stack2: Container = new Container();
    private _activeStack = 2;
    
    activated = false;

    constructor(scene: AppScreen) {
        super({
            content: new Container(),
            styles: {
                position: 'center',
                maxWidth: '90%',
                maxHeight: '90%',
                width: config.width,
                height: config.height,
            }
        });

        scene.addChild(this);

        this.createSprites(config.spritesCount);

        this.charge();
    }

    private createSprites(count: number) {
        this.innerView.addChild(this.stack2, this.stack1);

        const pos = config.width / 2;

        this.stack1.x = pos + config.stack1Offset;
        this.stack1.y = pos + config.stack1Offset;

        this.stack2.x = pos + config.stack2Offset;
        this.stack2.y = pos + config.stack2Offset;

        const start = performance.now();

        for (let i = 0; i < count; i++) {
            const texture = getRandomItem(config.spritesPull);
            const sprite = Sprite.from(texture);

            sprite.anchor.set(0.5);
            sprite.scale.set(0.3);

            sprite.x = Math.random() * config.stackScatter;
            sprite.y = Math.random() * config.stackScatter;

            this.passiveStack.addChild(sprite);
        }

        const end = performance.now();

        console.log(`${count} sprites created in ${end - start} ms`);
    }

    get innerView(): Container { 
        return this.children[0] as Container;
    }

    private get activeItem(): Container {
        return this.passiveStack.children[this.passiveStack.children.length - 1] as Container;
    }

    private shoot() { 
        if (this.passiveStack.children.length === 0) { 
            this.reshuffle();
            return;
        }
        
        this.activated = true;
        
        this.moveActiveItem();
        this.shake(this.passiveStack, 1);
        this.shake(this.activeStack, -1);
    }

    private moveActiveItem() { 
        const activeItemX = this.activeItem.x;
        const activeItemY = this.activeItem.y;

        const stack2DistanceX = this.activeStack.x - this.passiveStack.x;
        const stack2DistanceY = this.activeStack.y - this.passiveStack.y;
        
        const angle = (randomInRange(0, 1) ? 360 : -360) * 4

        gsap.to(this.activeItem, {
            x: stack2DistanceX + activeItemX, 
            y: stack2DistanceY + activeItemY,
            angle,
            duration: config.duration,
            onComplete: () => {
                this.activeItem.x = activeItemX;
                this.activeItem.y = activeItemY;

                this.moveActiveToTheOtherStack();

                this.charge();
            },
            ease: Elastic.easeOut
        });

    }

    private moveActiveToTheOtherStack() { 
        this.activeStack.addChild(this.activeItem);
    }

    private get activeStack(): Container {
        return this._activeStack === 1 ? this.stack1 : this.stack2;
    }

    private get passiveStack(): Container {
        return this._activeStack === 1 ? this.stack2 : this.stack1;
    }

    private shake(stack: Container, direction: number) {
        let shake = randomInRange(4, 20) * direction;

        gsap.fromTo(
            stack,
            {
                x: stack.x - shake,
                y: stack.y - shake,
                ease: Elastic.easeOut,
                duration: config.duration / 4,
            },
            {
                duration: config.duration / 4,
                x: stack.x,
                y: stack.y,
                ease: Elastic.easeOut
            },
        );
    }

    private charge() {
        setTimeout(() => this.shoot(), config.repeatDelay * 1000);
    }

    private reshuffle() {
        gsap.to(
            this.activeStack,
            {
                x: this.passiveStack.x,
                y: this.passiveStack.y,
                ease: Elastic.easeOut,
                duration: config.duration,
            },
        );
        gsap.to(
            this.passiveStack,
            {
                x: this.activeStack.x,
                y: this.activeStack.y,
                ease: Elastic.easeOut,
                duration: config.duration,
                onComplete: () => { 
                    this._activeStack = this._activeStack === 1 ? 2 : 1;
                    
                    this.addChildAt(this.activeStack, 0);
                    this.addChildAt(this.passiveStack, 1);

                    this.charge();
                }
            },
        );
    }
}