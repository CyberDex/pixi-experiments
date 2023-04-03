import { Signal } from "typed-signals";
import Matter from 'matter-js';

export interface IGame { 
    engine?: Matter.Engine;
    x: number;
    y: number;
    items?: any[];
    onStateChange: Signal<(key: string, value: number) => void>;
    activated: boolean;
    state: {
        get: (key: string) => number;
        set: (key: string, value: number) => void;
    };
    init(): Promise<void>;
    start(): void;
    pause(): void;
    resume(): void;
    update?(): void;
    resize?(width: number, height: number): void;
}