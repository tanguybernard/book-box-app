import { BookPrismaRepository } from "@/infrastructure/prisma/BookPrismaRepository";
import { NextResponse } from "next/server";
import {ListBooksUseCase} from "@/core/books/ListBooksUseCase";
import {AddBookUseCase} from "@/core/books/AddBookUseCase";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    const repo = new BookPrismaRepository();
    const listBooks = new ListBooksUseCase(repo);
    const books = await listBooks.execute(resolvedParams.slug);
    console.log("BOOKS GET");
    return NextResponse.json(books);
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    const repo = new BookPrismaRepository();
    const addBook = new AddBookUseCase(repo);
    const body = await req.json();

    const book = await addBook.execute({ ...body, addressId: resolvedParams.slug });
    return NextResponse.json(book);
}
