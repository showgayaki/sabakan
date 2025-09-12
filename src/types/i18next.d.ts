import "i18next";

import ja from "../../locales/ja/ui.json";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            translation: typeof ja;
        };
    }
}

// 存在しないキーを指定した場合にエラーにするための型
// 再帰的にキーを "a.b.c" の形に変換する
type Paths<T, Prefix extends string = ""> = T extends string
    ? Prefix
    : {
        [K in keyof T & string]: Paths<T[K], `${Prefix}${Prefix extends "" ? "" : "."}${K}`>;
    }[keyof T & string];


export type TranslationKeys = Paths<typeof ja>;
