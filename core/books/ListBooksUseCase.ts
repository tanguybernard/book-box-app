import { BookRepository } from "./BookRepository";

export class ListBooksUseCase {
    constructor(private repo: BookRepository) {}

    async execute(citySlug: string) {
        return this.repo.findByAddressId(citySlug);
    }
}