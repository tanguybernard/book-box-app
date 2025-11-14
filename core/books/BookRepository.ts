import { Book } from "./Book";

export interface BookRepository {
    add(book: Book): Promise<Book>;
    findByAddressId(addressId: string): Promise<Book[]>;
}