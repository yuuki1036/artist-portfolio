const dictionaries = {
  en: () =>
    import("../../public/locales/en.json").then((module) => module.default),
  ja: () =>
    import("../../public/locales/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries]();
};
