import { notFound } from "next/navigation"
import { mockBookBoxes } from "../../data/mockBookBoxes"

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
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="max-w-lg bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-semibold mb-4 text-center">{bookBox.name}</h1>
                <p className="text-gray-700 text-center mb-6">{bookBox.description || `Book box located at ${bookBox.address}`}</p>

                <h2 className="text-xl font-semibold mb-2">Livres scannés</h2>
                <ul>
                    {books.map((b: any) => (
                        <li key={b.id}>
                            {
                                b.thumbnail ? (
                                    <img src={b.thumbnail} alt="" width={40} className="inline mr-2" />

                                ) : (
                                    <img src="http://localhost:3000/image-not-found.png" alt="" width={40} className="inline mr-2" />
                                )
                            }
                            {b.title} — {b.author}
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center mt-6">

                    <a
                        href={`/address/${resolvedParams.slug}/add-book`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        + Scanner un livre
                    </a>

                    <a
                        href="/"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        ← Retour à la carte
                    </a>
                </div>
            </div>
        </main>
    );
}
