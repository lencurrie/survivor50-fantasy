export function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
