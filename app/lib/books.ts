export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  addedAt: number; // timestamp
}

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all books from localStorage
export const getBooks = (): Book[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const booksJson = localStorage.getItem('books');
  if (!booksJson) {
    return [];
  }
  
  try {
    return JSON.parse(booksJson);
  } catch (error) {
    console.error('Error parsing books from localStorage:', error);
    return [];
  }
};

// Add a new book
export const addBook = (bookData: Omit<Book, 'id' | 'addedAt'>): Book => {
  const books = getBooks();
  
  const newBook: Book = {
    ...bookData,
    id: generateId(),
    addedAt: Date.now(),
  };
  
  const updatedBooks = [...books, newBook];
  localStorage.setItem('books', JSON.stringify(updatedBooks));
  
  return newBook;
};

// Delete a book by ID
export const deleteBook = (id: string): boolean => {
  const books = getBooks();
  const updatedBooks = books.filter(book => book.id !== id);
  
  if (updatedBooks.length === books.length) {
    return false; // Book not found
  }
  
  localStorage.setItem('books', JSON.stringify(updatedBooks));
  return true;
};

// Get a book by ID
export const getBookById = (id: string): Book | undefined => {
  const books = getBooks();
  return books.find(book => book.id === id);
};