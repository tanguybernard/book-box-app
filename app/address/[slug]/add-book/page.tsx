"use client";
import { useState, use } from "react";
import BarcodeScanner from "../../../components/BarcodeScanner";
import { mockBookBoxes } from "../../../data/mockBookBoxes";

export default function AddBookPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const bookBox = mockBookBoxes.find(b => b.id === slug);
    const bookBoxName = bookBox ? bookBox.name : slug;

    const [isbn, setIsbn] = useState("");
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleDetected(code: string) {
        setIsbn(code);
        setLoading(true);
        setMessage("");
        setBook(null);

        try {
            // 1️⃣ Récupère les infos du livre
            const res = await fetch(`/api/books/fetch?isbn=${code}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setBook(data);

            // 2️⃣ Enregistre dans la base
            const addRes = await fetch(`/api/address/${slug}/books`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const added = await addRes.json();
            if (added.error) throw new Error(added.error);
            setMessage(`✅ Livre ajouté : ${added.title}`);
        } catch (err: any) {
            setMessage(`❌ Erreur : ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="max-w-lg bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
                <h1 className="text-2xl font-semibold mb-4">Ajouter un livre à {bookBoxName}</h1>

                <BarcodeScanner onDetected={handleDetected} />

                {loading && <p className="mt-4 text-blue-600">Chargement...</p>}
                {message && <p className="mt-4">{message}</p>}

                {book && (
                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-lg font-semibold">{book.title}</h2>
                        <p className="text-gray-600">{book.author}</p>
                        {book.thumbnail && (
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                className="mx-auto mt-2 rounded-lg shadow w-32"
                            />
                        )}
                    </div>
                )}

                <a
                    href={`/address/${slug}`}
                    className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    ← Retour à {bookBoxName}
                </a>
            </div>
        </main>
    );
}
