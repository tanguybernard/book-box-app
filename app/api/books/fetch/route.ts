import { NextResponse } from "next/server";
import {fetchBookInfo} from "@/infrastructure/spi/GoogleBooksAPI";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const isbn = searchParams.get("isbn");
    if (!isbn) return NextResponse.json({ error: "Missing ISBN" }, { status: 400 });

    const book = await fetchBookInfo(isbn);
    if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });

    return NextResponse.json(book);
}
