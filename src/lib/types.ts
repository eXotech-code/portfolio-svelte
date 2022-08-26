export type Color = [number, number, number];

export interface Tag {
    text: string;
    borderColor: Color;
}

export interface BlogPost {
    id: number;
    image: boolean;
    title: string;
    date: string;
    description: string;
    tags: Tag[];
    alt?: string;
}

export interface Project {
    name: string;
    nameHeight: number;
    description: Array<string>;
    link: string;
    banner: Array<string>;
}