export function getRandomItem(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}