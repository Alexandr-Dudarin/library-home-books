import { Category } from "../model/Category";
import "./renderCategories.css";

export function renderCategories(
  selected: Category | null,
  onSelect: (category: Category) => void
) {
  const ul = document.querySelector<HTMLUListElement>("#categories")!;
  ul.innerHTML = "";

  Object.values(Category).forEach(category => {
    const li = document.createElement("li");
    li.textContent = category;

    if (category === selected) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => onSelect(category));

    ul.appendChild(li);
  });
}