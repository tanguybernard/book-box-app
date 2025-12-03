import { notFound } from "next/navigation"
import { mockBookBoxes } from "../../data/mockBookBoxes"
import { sponsoredBooks } from "../../data/sponsoredBooks"
import { MapContainer } from "../../containers/MapContainer"
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


    const fetchedBooks = await res.json();
    const books = [...sponsoredBooks, ...fetchedBooks];

    return (
        <main className={styles.main}>
            {/* Sidebar (Details + Books) */}
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{bookBox.name}</h1>
                    <p className={styles.description}>{bookBox.description || `Book box located at ${bookBox.address}`}</p>
                </div>

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
                        ← Retour
                    </a>
                </div>

                <h2 className={styles.subtitle}>Livres disponibles ({books.length})</h2>

                {books.length > 0 ? (
                    <div className={styles.bookGrid}>
                        {books.map((b: any) => (
                            <div key={b.id} className={`${styles.bookItem} ${b.isSponsored ? styles.sponsored : ''}`}>
                                <div className={styles.bookThumbnailContainer}>
                                    {b.isSponsored && <span className={styles.sponsoredBadge}>Sponsorisé</span>}
                                    {b.thumbnail ? (
                                        <img src={b.thumbnail} alt={b.title} className={styles.bookThumbnail} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                                            <span className="text-xs">No Cover</span>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.bookInfo}>
                                    <h3 className={styles.bookTitle}>{b.title}</h3>
                                    <p className={styles.bookAuthor}>{b.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-stone-500 italic text-center py-10">Aucun livre pour le moment. Soyez le premier à en déposer un !</p>
                )}
            </div>

            {/* Map */}
            <div className={styles.mapContainer}>
                <MapContainer
                    bookBoxes={[bookBox]}
                    center={[bookBox.lat, bookBox.lng]}
                    zoom={16}
                />
            </div>
        </main>
    );
}
