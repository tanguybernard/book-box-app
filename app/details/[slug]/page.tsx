import { notFound } from "next/navigation"

interface DetailsPageProps {
    params: { slug: string }
}

// Exemple de "base de données" temporaire
const cities = {
    paris: {
        name: "Paris",
        description: "Capitale de la France, connue pour la Tour Eiffel et ses musées.",
        coords: [48.8566, 2.3522],
    },
    lyon: {
        name: "Lyon",
        description: "Ville du Rhône, célèbre pour sa gastronomie et son vieux centre historique.",
        coords: [45.764, 4.8357],
    },
    marseille: {
        name: "Marseille",
        description: "Grand port du sud de la France, connu pour le Vieux-Port et le soleil.",
        coords: [43.2965, 5.3698],
    },
}

export default async function CityDetailsPage({ params }: DetailsPageProps) {
    const resolvedParams = await params
    const city = cities[resolvedParams.slug as keyof typeof cities]

    if (!city) {
        notFound()
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="max-w-lg bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-semibold mb-4 text-center">{city.name}</h1>
                <p className="text-gray-700 text-center mb-6">{city.description}</p>

                <div className="flex justify-center">
                    <a
                        href="/map"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        ← Retour à la carte
                    </a>
                </div>
            </div>
        </main>
    )
}
