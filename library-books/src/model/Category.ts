export const Category = {
  Fantasy: "Fantasy",
  Detective: "Detective",
  Science: "Science",
  Novel: "Novel"
} as const;

export type Category = typeof Category[keyof typeof Category];

export const CategoryIcons: Record<Category, string> = {
  Fantasy: "🧙",
  Detective: "🕵️",
  Science: "🔬",
  Novel: "📖"
};