import { Library } from "../model/Library";
import { renderCategories } from "../view/renderCategories";
import { renderBooks } from "../view/renderBooks";
import { initForm } from "../view/formView";
import { Category } from "../model/Category";
import type { Book } from "../model/Book";

export class AppController {
    private selectedCategory: Category | null = null;
    private library: Library;

    constructor(library: Library) {
        this.library = library;

        renderCategories(this.selectedCategory, this.handleCategorySelect);
        initForm(this.handleAddBook);

        this.render();
    }

    private handleCategorySelect = (category: Category) => {
        this.selectedCategory = category;
        this.render();
    };

    private editingId: string | null = null;

    private handleEditBook = (book: Book) => {
        this.editingId = book.id;

        (document.querySelector("#title") as HTMLInputElement).value = book.title;
        (document.querySelector("#author") as HTMLInputElement).value = book.author;
        (document.querySelector("#category") as HTMLSelectElement).value = book.category;
    };

    private handleAddBook = (bookData: Omit<Book, "id">) => {
        if (this.editingId) {
            this.library.update({ id: this.editingId, ...bookData });
            this.editingId = null;
        } else {
            this.library.add({
                id: crypto.randomUUID(),
                ...bookData,
            });
        }

        this.render();
    };

    private handleDeleteBook = (id: string) => {
        this.library.delete(id);
        this.render();
    };

    private render() {
        const books = this.selectedCategory
            ? this.library.getByCategory(this.selectedCategory)
            : this.library.getAll();

        renderBooks(books, this.handleDeleteBook, this.handleEditBook);
    }
}