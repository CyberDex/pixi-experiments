import { Signal } from 'typed-signals';
import Matter from 'matter-js';
import { Graphics } from '@pixi/graphics';

export interface IGame {
    engine: Matter.Engine;
    x: number;
    y: number;
    items?: any[];
    onStateChange: Signal<(key: string, value: number) => void>;
    activated: boolean;
    state: {
        get: (key: string) => number;
        set: (key: string, value: number) => void;
    };

    box: Graphics;
    init(): Promise<void>;
    start(): void;
    pause(): void;
    resume(): void;
    update?(): void;
    resize?(width: number, height: number): void;
}
