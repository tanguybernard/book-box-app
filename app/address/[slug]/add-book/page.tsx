"use client";
import { useState, use } from "react";
import BarcodeScanner from "../../../components/BarcodeScanner";
import { mockBookBoxes } from "../../../data/mockBookBoxes";
import styles from "./page.module.css";

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
        <main className={styles.main}>
            <div className={styles.card}>
                <h1 className={styles.title}>Ajouter un livre à {bookBoxName}</h1>

                <BarcodeScanner onDetected={handleDetected} />

                {loading && <p className={styles.loading}>Chargement...</p>}
                {message && <p className={styles.message}>{message}</p>}

                {book && (
                    <div className={styles.bookDetails}>
                        <h2 className={styles.bookTitle}>{book.title}</h2>
                        <p className={styles.bookAuthor}>{book.author}</p>
                        {book.thumbnail && (
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                className={styles.bookThumbnail}
                            />
                        )}
                    </div>
                )}

                <a
                    href={`/address/${slug}`}
                    className={styles.buttonBack}
                >
                    ← Retour à {bookBoxName}
                </a>
            </div>
        </main>
    );
}
