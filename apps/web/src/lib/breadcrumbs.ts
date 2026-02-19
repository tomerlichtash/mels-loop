import type { BreadcrumbItem } from "@mels-loop/ui/shell";

export function homeItem(locale: string, homeLabel: string): BreadcrumbItem {
  return { label: homeLabel, href: "/" };
}

/** Safely resolve a dot-notation key from the dict */
export function dictGet(dict: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else return key;
  }
  return typeof current === "string" ? current : key;
}
