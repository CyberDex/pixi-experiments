export interface IGame { 
    update?(): void;
    resize?(width: number, height: number): void;
}