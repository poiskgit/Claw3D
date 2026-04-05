import { useI18nContext } from "./I18nContext";
import { TranslationDict, en } from "./dictionaries/en";

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]> extends string ? DotNestedKeys<T[K]> : ""
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

// Resolves a string path like 'common.save' into the dictionary object
function resolvePath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

export function useTranslation() {
  const { dict, locale, setLocale } = useI18nContext();

  const t = (key: DotNestedKeys<TranslationDict>): any => {
    let value = resolvePath(dict, key);
    
    // Fallback to English dictionary if missing in current locale
    if (value === undefined && locale !== "en") {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing translation key: "${key}" for locale "${locale}"`);
      }
      value = resolvePath(en, key);
    }

    // If still undefined, return the key (or last part of it)
    if (value === undefined) {
      if (process.env.NODE_ENV === "development") {
        return key; // Observability during dev
      }
      // Hide path from end user
      const parts = key.split(".");
      return parts[parts.length - 1] ?? key;
    }

    return value;
  };

  return { t, locale, setLocale };
}
