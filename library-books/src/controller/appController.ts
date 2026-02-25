import { Library } from "../model/Library";
import { renderCategories } from "../view/renderCategories";
import { renderBooks } from "../view/renderBooks";
import { initForm, setSubmitMode } from "../view/formView";
import { Category } from "../model/Category";
import type { Book } from "../model/Book";

console.log("formView loaded");

export class AppController {
    private selectedCategory: Category | null = null;
    private editingId: string | null = null;
    private library: Library;

    constructor(library: Library) {
        this.library = library;

        initForm(this.handleAddBook);
        setSubmitMode(false);

        this.render();
    }

    private handleCategorySelect = (category: Category | null) => {
        this.selectedCategory = category;
        this.render();
    };

    private handleEditBook = (book: Book) => {
        this.editingId = book.id;

        (document.querySelector("#title") as HTMLInputElement).value = book.title;
        (document.querySelector("#author") as HTMLInputElement).value = book.author;
        (document.querySelector("#category") as HTMLSelectElement).value =
            book.category;

        setSubmitMode(true);
    };

    private handleAddBook = (bookData: Omit<Book, "id">) => {
        if (this.editingId) {
            this.library.update({ id: this.editingId, ...bookData });
            this.editingId = null;
            setSubmitMode(false);
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
        const allBooks = this.library.getAll();

        renderCategories(
            this.selectedCategory,
            allBooks,
            this.handleCategorySelect
        );

        const books = this.selectedCategory
            ? this.library.getByCategory(this.selectedCategory)
            : allBooks;

        renderBooks(books, this.handleDeleteBook, this.handleEditBook);
    }
}