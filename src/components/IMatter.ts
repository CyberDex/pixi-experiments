import { Body } from 'matter-js';

export interface IMatter {
    body: Body;
    beforeUnload(): void;
    update(): void;
    resetPosition(): void;
}
