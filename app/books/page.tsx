'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBooks, deleteBook, Book } from '../lib/books';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load books from localStorage when component mounts
  useEffect(() => {
    setBooks(getBooks());
    setIsLoading(false);
  }, []);

  // Handle book deletion
  const handleDeleteBook = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      const success = deleteBook(id);
      if (success) {
        setBooks(books.filter(book => book.id !== id));
      }
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-600">📚 Ma Bibliothèque</h1>
        <div className="flex gap-2">
          <Link 
            href="/"
            className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Accueil
          </Link>
          <Link 
            href="/books/add"
            className="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Ajouter un livre
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center py-8">Chargement...</p>
      ) : books.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">Aucun livre dans votre bibliothèque</p>
          <Link 
            href="/books/add"
            className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Ajouter votre premier livre
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map(book => (
            <div key={book.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <button 
                  onClick={() => handleDeleteBook(book.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Supprimer"
                >
                  🗑️
                </button>
              </div>
              <p className="text-gray-600">Par {book.author}</p>
              {book.description && (
                <p className="text-gray-500 mt-2 text-sm">{book.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Ajouté le {new Date(book.addedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}