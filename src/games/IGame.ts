export interface IGame { 
    progress: string;
    activated: boolean;
    init(): Promise<void>;
    start(): void;
    pause(): void;
    resume(): void;
    update?(): void;
    resize?(width: number, height: number): void;
}