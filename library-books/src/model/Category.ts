export const Category = {
  Fantasy: "Fantasy",
  Detective: "Detective",
  Science: "Science",
  Novel: "Novel"
} as const;

export type Category = typeof Category[keyof typeof Category];