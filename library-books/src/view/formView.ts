import { Category } from "../model/Category";
import type { Book } from "../model/Book";

export function initForm(
    onSubmit: (data: Omit<Book, "id">) => void,
      onCancel?: () => void
) {
    const form = document.querySelector<HTMLFormElement>("#bookForm")!;
    const titleInput = document.querySelector<HTMLInputElement>("#title")!;
    const authorInput = document.querySelector<HTMLInputElement>("#author")!;
    const categorySelect = document.querySelector<HTMLSelectElement>("#category")!;
      const cancelBtn = document.querySelector<HTMLButtonElement>("#cancelEdit")!;

    Object.values(Category).forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        onSubmit({
            title: titleInput.value,
            author: authorInput.value,
            category: categorySelect.value as Category
        });
        form.reset();
    });

    if (onCancel) {
        cancelBtn.addEventListener("click", () => {
            form.reset();
            onCancel();
        });
    }
}

export function setSubmitMode(isEdit: boolean) {
    const btn = document.querySelector<HTMLButtonElement>(
        '#bookForm button[type="submit"]'
    )!

    btn.textContent = isEdit ? "Обновить книгу" : "Добавить книгу"
}