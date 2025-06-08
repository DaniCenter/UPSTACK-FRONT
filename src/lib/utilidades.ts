export function formatDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}
