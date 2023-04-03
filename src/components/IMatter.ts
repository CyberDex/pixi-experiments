import { IGame } from "../games/IGame";

export interface IMatter {
    rigidBody: Matter.Body;
    game: IGame;
    beforeUnload(): void;
    update(): void;
    resetPosition(): void;
}