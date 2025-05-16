export interface Journey {
    id: number;
    country: string;
    city: string;
    description?: string;
    image?: string;
    date: [string | null, string | null];
    coords: [number, number];
    publicLink: string;
}