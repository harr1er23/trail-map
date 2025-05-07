export interface Journey {
    id: number;
    title: string;
    country: string;
    city: string;
    description?: string;
    photoUrl?: string;
    startDate: string;
    endDate: string;
    coordinates: [number, number];
}