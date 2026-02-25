import type { Book } from "./Book";
import type { Category } from "./Category";

const STORAGE_KEY = "books";

export class Library {
  private books: Book[] = [];

  constructor() {
    this.load();
  }

  getAll(): Book[] {
    return this.books;
  }

  getByCategory(category: Category): Book[] {
    return this.books.filter(b => b.category === category);
  }

  add(book: Book): void {
    this.books.push(book);
    this.save();
  }

  delete(id: string): void {
    this.books = this.books.filter(b => b.id !== id);
    this.save();
  }

  update(updatedBook: Book): void {
    this.books = this.books.map(b =>
      b.id === updatedBook.id ? updatedBook : b
    );
    this.save();
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
  }

  private load(): void {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.books = JSON.parse(data) as Book[];
    }
  }
}