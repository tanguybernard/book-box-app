import { prisma } from "./client";
import {Book} from "@/core/books/Book";
import {BookRepository} from "@/core/books/BookRepository";


export class BookPrismaRepository implements BookRepository {
    async add(book: Book) {
        const data = this.toPrisma(book);
        const created = await prisma.book.create({ data });
        return this.fromPrisma(created);
    }

    async findByAddressId(addressId: string): Promise<Book[]> {
        const rows = await prisma.book.findMany({
            where: { addressId: addressId },
            orderBy: { createdAt: "desc" },
        });
        return rows.map(this.fromPrisma);

    }


    // --- mapping methods ---
    private toPrisma(book: Book) {
        return {
            // ne pas inclure `id` car auto-généré par Prisma
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            thumbnail: book.thumbnail,
            addressId: book.addressId,
        };
    }

    private fromPrisma(prismaBook: any): Book {
        return {
            id: prismaBook.id,
            title: prismaBook.title,
            author: prismaBook.author,
            isbn: prismaBook.isbn,
            thumbnail: prismaBook.thumbnail,
            addressId: prismaBook.addressId,
        };
    }
}
