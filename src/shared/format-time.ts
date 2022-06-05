export function FormatDateStringToString(v: string): string {
  const vb = v || "0";
  return new Intl.DateTimeFormat("en", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(vb));
}
