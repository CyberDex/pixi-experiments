export interface IGame { 
    activated: boolean;
    update?(): void;
    resize?(width: number, height: number): void;
}