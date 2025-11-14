import { Book } from "./Book";
import { BookRepository } from "./BookRepository";

export class AddBookUseCase {
    constructor(private repo: BookRepository) {}

    async execute(book: Book): Promise<Book> {
        const existing = await this.repo.findByAddressId(book.addressId);
        if (existing.some((b) => b.isbn === book.isbn)) {
            throw new Error("Book already exists in this city");
        }
        return this.repo.add(book);
    }
}