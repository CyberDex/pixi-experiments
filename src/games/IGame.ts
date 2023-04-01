export interface IGame { 
    progress: string;
    activated: boolean;
    update?(): void;
    resize?(width: number, height: number): void;
}