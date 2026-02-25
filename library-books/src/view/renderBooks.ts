import type { Book } from "../model/Book";

export function renderBooks(
    books: Book[],
    onDelete: (id: string) => void,
    onEdit: (book: Book) => void
) {
    const ul = document.querySelector<HTMLUListElement>("#books")!;
    ul.innerHTML = "";

    books.forEach(book => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = `${book.title} — ${book.author}`;

        text.addEventListener("click", () => onEdit(book));

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.addEventListener("click", () => onDelete(book.id));

        li.append(text, delBtn);
        ul.appendChild(li);
    });
}