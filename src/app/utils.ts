import * as THREE from 'three';

export const colorList: Array<string> = [
    'red', 'blue', 'green', 'yellow', 'white', 'purple', 'pink', 'orange', 'brown', 'gray'
]

export const getRandomFromList = (list: Array<any>) => list[list.length * Math.random() | 0];

export const getCircleMoveAngle = (circleParts: number) => (2 * Math.PI) / circleParts;

export function alignListInCircularCoordinate(listCount: number, ray: number) {
    const angle = (2 * Math.PI) / listCount;
    const coordinates = [];

    for (let i = 0; i < listCount; i++) {
        const x = ray * Math.cos(i * angle);
        const y = ray * Math.sin(i * angle);
        coordinates.push({ x, y });
    }

    return coordinates;
}

export const createScreen = () => new THREE.Mesh(
    new THREE.PlaneGeometry(0.75, 0.5),
    new THREE.MeshBasicMaterial({ color: getRandomFromList(colorList) })
)

export const createScreens = (count: number) => { 
    let screens: Array<any> = [];

    for(let index = 0; index < count; index++) screens.push(createScreen())

    return screens;
}