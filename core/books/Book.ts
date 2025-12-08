export interface Book {
    id?: number;
    isbn: string;
    title: string;
    authors: string[];
    thumbnail: string | null;
    addressId: string;
}
