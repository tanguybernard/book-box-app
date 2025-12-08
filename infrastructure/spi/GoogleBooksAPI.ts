export async function fetchBookInfo(isbn: string) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const data = await res.json();
    const info = data.items?.[0]?.volumeInfo;
    if (!info) return null;

    return {
        isbn,
        title: info.title,
        authors: info.authors || [],
        thumbnail: info.imageLinks?.thumbnail ?? null,
    };
}