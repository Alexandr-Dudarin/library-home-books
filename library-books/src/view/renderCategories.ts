import { Category, CategoryIcons } from "../model/Category";
import type { Book } from "../model/Book";

export function renderCategories(
    selected: Category | null,
    books: Book[],
    onSelect: (category: Category | null) => void
) {
    const ul = document.querySelector<HTMLUListElement>("#categories")!;
    ul.innerHTML = "";

    const allLi = document.createElement("li");
    allLi.textContent = `Все (${books.length})`;

    if (selected === null) {
        allLi.classList.add("active");
    }

    allLi.addEventListener("click", () => onSelect(null));
    ul.appendChild(allLi);

    Object.values(Category).forEach(category => {
        const li = document.createElement("li");

        const count = books.filter(b => b.category === category).length;

        li.textContent = `${CategoryIcons[category]} ${category} (${count})`;

        if (category === selected) {
            li.classList.add("active");
        }

        li.addEventListener("click", () => onSelect(category));

        ul.appendChild(li);
    });
}