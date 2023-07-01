export interface IMatter {
    body: Matter.Body;
    beforeUnload(): void;
    update(): void;
    resetPosition(): void;
}
