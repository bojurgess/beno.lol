export interface Link {
    id: number;
    icon: string;
    href: string;
    color: HexColor;
}

type HexColor = `#${string}`;