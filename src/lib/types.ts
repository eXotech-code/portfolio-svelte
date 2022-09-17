export type Color = [number, number, number];

export interface Tag {
    name: string;
    colour: Color;
    bgcolour: Color;
}

export interface BlogPost {
    id: number;
    image: number; // 0 or 1
    title: string;
    date: string;
    description: string;
    tags: Tag[];
    author?: string;
    content?: string;
}

export interface Project {
    name: string;
    tagline: string;
    nameHeight: number;
    description: Array<string>;
    link: string;
    banner: Array<string>;
}

export interface Notification {
    message: string;
    bad: boolean;
}

export type Point = [number, number];

export type Range = [number, number, number, number];