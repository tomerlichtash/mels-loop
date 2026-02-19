import type { Locale } from "./config";
import { getDirection } from "./config";

type Messages = Record<string, unknown>;

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: () => import("./messages/en.json").then((m) => m.default),
  he: () => import("./messages/he.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Messages> {
  const loader = dictionaries[locale];
  if (!loader) {
    return dictionaries.en();
  }
  return loader();
}

export { getDirection };
