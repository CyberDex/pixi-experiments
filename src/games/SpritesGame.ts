import { AppScreen } from "../components/basic/AppScreen";
import { IGame } from "./IGame";
import config from "../config/spritesGameConfig";
import { Sprite } from "@pixi/sprite";
import { randomInRange } from "../utils/random";
import { Layout } from "@pixi/layout";
import { Container } from "@pixi/display";
import { Elastic, gsap } from "gsap";
import { initEmojis } from "../utils/preload";


export class SpritesGame extends Layout implements IGame { 
    progress = `0 / ${config.spritesCount}`;
    private stack1: Container = new Container();
    private stack2: Container = new Container();
    private _activeStack = 2;
    private _activeItemID = 1;
    private interval!: number;
    private items: Container[] = [];
    
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

        this.init();
    }

    async init() {
        await initEmojis();

        this.createSprites(config.spritesCount);

        this.start();
    }

    private async createSprites(count: number) {
        this.innerView.addChild(this.stack2, this.stack1);

        this.innerView.sortableChildren = true;
        this.stack1.sortableChildren = true;
        this.stack2.sortableChildren = true;

        const pos = config.width / 2;

        this.stack1.x = pos + config.stack1Offset;
        this.stack1.y = pos + config.stack1Offset;

        this.stack2.x = pos + config.stack2Offset;
        this.stack2.y = pos + config.stack2Offset;

        const start = performance.now();

        for (let i = 0; i < count; i++) {
            const type = randomInRange(1, 16);
            const sprite = Sprite.from(`emoji${type}`);

            sprite.cullable = true;
            sprite.anchor.set(0.5);
            sprite.scale.set(0.3);
            sprite.angle = randomInRange(1, config.stackRotationScatter);

            sprite.x = Math.random() * config.stackScatter;
            sprite.y = Math.random() * config.stackScatter;

            this.passiveStack.addChild(sprite);
            this.items.push(sprite);
        }

        const end = performance.now();

        console.log(`${count} sprites created in ${end - start} ms`);
    }

    get innerView(): Container { 
        return this.children[0] as Container;
    }

    private start() {     
        this._activeItemID = this.items.length - 1;   
        this.interval = setInterval(() => this.shoot(), config.repeatDelay * 1000);
    }

    private get activeStack(): Container {
        return this._activeStack === 1 ? this.stack1 : this.stack2;
    }

    private get passiveStack(): Container {
        return this._activeStack === 1 ? this.stack2 : this.stack1;
    }


    private async shoot() { 
        const itemID = this._activeItemID;
        const activeItem = this.items[itemID];

        this.progress = `${this.activeStack.children.length + 1} / ${config.spritesCount}`;
        
        this.activated = true;
        
        this.moveItem(activeItem).then(() => {
            if (itemID === 0) { 
                this.reshuffle();
            }
        });
        this.shake(this.passiveStack, 1);
        this.shake(this.activeStack, -1);

        if (itemID === 0) { 
            clearInterval(this.interval);
        }
    }

    private reshuffle() {       
        this.progress = `0 / ${config.spritesCount}`;

        this.items.reverse();

        this.swapStacks();
    }

    private swapStacks() {
        gsap.to(
            this.activeStack,
            {
                x: this.passiveStack.x,
                y: this.passiveStack.y,
                onComplete: () => this.restart()
            },
        );

        this.passiveStack.x = this.activeStack.x;
        this.passiveStack.y = this.activeStack.y;
    }

    private restart() {
        this._activeStack = this._activeStack === 1 ? 2 : 1;
                    
        this.activeStack.zIndex = 0;
        this.passiveStack.zIndex = 1;

        this.start();
    }

    private moveItem(item: Container): Promise<void> { 
        return new Promise((resolve) => {
            const posX = item.x;
            const posY = item.y;

            const angle = 
                randomInRange(1, config.stackRotationScatter) 
                * (randomInRange(0, 1) ? 1 : -1) 
                * 4;

            item.zIndex = -this._activeItemID;

            gsap.to(item, {
                x: this.stackDistance.x + posX, 
                y: this.stackDistance.y + posY,
                angle,
                duration: config.duration,
                onComplete: () => {
                    this.activeStack.addChild(item);

                    item.x = posX;
                    item.y = posY;

                    resolve();
                },
                ease: Elastic.easeOut
            });

            this._activeItemID--;
        })
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

    private get stackDistance(): {x: number, y: number} {
        if (!this.activeStack || !this.passiveStack) return { x: 0, y: 0 };

        return ({
            x: this.activeStack.x - this.passiveStack.x,
            y: this.activeStack.y - this.passiveStack.y,
        });
    }
}