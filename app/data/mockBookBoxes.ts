export interface BookBox {
    id: string;
    name: string;
    address: string;
    city: string;
    lat: number;
    lng: number;
    description?: string;
}

export const mockBookBoxes: BookBox[] = [
    {
        id: "1",
        name: "Paris Eiffel Tower Book Box",
        address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
        city: "Paris",
        lat: 48.8584,
        lng: 2.2945,
        description: "A lovely book box with a view of the Iron Lady.",
    },
    {
        id: "2",
        name: "Gare du Nord Book Station",
        address: "18 Rue de Dunkerque, 75010 Paris",
        city: "Paris",
        lat: 48.8809,
        lng: 2.3553,
        description: "Grab a book before your train departs!",
    },
    {
        id: "3",
        name: "Montmartre Artsy Box",
        address: "Place du Tertre, 75018 Paris",
        city: "Paris",
        lat: 48.8865,
        lng: 2.3408,
        description: "Located in the heart of the artistic district.",
    },
    {
        id: "4",
        name: "Lyon Bellecour Box",
        address: "Place Bellecour, 69002 Lyon",
        city: "Lyon",
        lat: 45.7578,
        lng: 4.832,
        description: "Exchange books in the largest square in Lyon.",
    },
    {
        id: "5",
        name: "Marseille Vieux Port Box",
        address: "Quai des Belges, 13001 Marseille",
        city: "Marseille",
        lat: 43.2951,
        lng: 5.3744,
        description: "Books by the sea.",
    },
];
