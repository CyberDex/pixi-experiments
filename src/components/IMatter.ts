import { IGame } from "../games/IGame";

export interface IMatter {
    body: Matter.Body;
    game: IGame;
    beforeUnload(): void;
    update(): void;
    resetPosition(): void;
}