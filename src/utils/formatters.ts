import EN_TEXTS from './texts/en.json';

type TextKey = keyof typeof EN_TEXTS;

var vocabulary = new Map(Object.entries(EN_TEXTS));

export var getText = (key: TextKey) => {
  return vocabulary.get(key) ?? `[[${key}]]`;
};
