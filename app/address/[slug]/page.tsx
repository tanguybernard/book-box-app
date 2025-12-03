import { notFound } from "next/navigation"
import { mockBookBoxes } from "../../data/mockBookBoxes"
import styles from "./page.module.css"

interface DetailsPageProps {
    params: { slug: string }
}

export default async function CityDetailsPage({ params }: DetailsPageProps) {
    const resolvedParams = await params
    const bookBox = mockBookBoxes.find(box => box.id === resolvedParams.slug)

    if (!bookBox) {
        notFound()
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';


    const res = await fetch(`${baseUrl}/api/address/${resolvedParams.slug}/books`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }


    const books = await res.json();

    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <h1 className={styles.title}>{bookBox.name}</h1>
                <p className={styles.description}>{bookBox.description || `Book box located at ${bookBox.address}`}</p>

                <h2 className={styles.subtitle}>Livres scannés</h2>
                <ul className={styles.bookList}>
                    {books.map((b: any) => (
                        <li key={b.id} className={styles.bookItem}>
                            {
                                b.thumbnail ? (
                                    <img src={b.thumbnail} alt="" className={styles.bookThumbnail} />

                                ) : (
                                    <img src="http://localhost:3000/image-not-found.png" alt="" className={styles.bookThumbnail} />
                                )
                            }
                            <span>{b.title} — <span className="text-stone-500 italic">{b.author}</span></span>
                        </li>
                    ))}
                </ul>

                <div className={styles.actions}>

                    <a
                        href={`/address/${resolvedParams.slug}/add-book`}
                        className={styles.buttonPrimary}
                    >
                        + Scanner un livre
                    </a>

                    <a
                        href="/"
                        className={styles.buttonSecondary}
                    >
                        ← Retour à la carte
                    </a>
                </div>
            </div>
        </main>
    );
}
