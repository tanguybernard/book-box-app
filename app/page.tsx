'use client';
import Link from "next/link";

export default function HomePage() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
          <h1 className="text-3xl font-bold text-emerald-600 mb-4">
            📚 Bibliothèque Locale
          </h1>

          <p className="text-gray-600 mb-6">
            Gérez facilement les livres présents dans votre espace.
            Disponible même hors connexion !
          </p>

          <Link
              href="/books"
              className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Voir les livres
          </Link>
        </div>

        <footer className="mt-6 text-xs text-gray-500">
          Progressive Web App — Offline ready ✅
        </footer>
      </main>
  );
}
