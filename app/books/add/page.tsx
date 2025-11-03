'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addBook } from '../../lib/books';

export default function AddBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      title?: string;
      author?: string;
    } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'L\'auteur est obligatoire';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      addBook({
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim() || undefined
      });
      
      // Redirect to books list
      router.push('/books');
    } catch (error) {
      console.error('Error adding book:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-600">📝 Ajouter un livre</h1>
        <Link 
          href="/books"
          className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Le titre du livre"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 mb-1">
            Auteur <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="L'auteur du livre"
            disabled={isSubmitting}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description (optionnelle)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Une brève description du livre"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Ajouter le livre'}
          </button>
        </div>
      </form>
    </main>
  );
}