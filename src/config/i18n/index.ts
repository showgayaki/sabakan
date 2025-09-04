import { invoke } from "@tauri-apps/api/core";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../../locales/en/ui.json";
import ja from "../../../locales/ja/ui.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ja: { translation: ja },
        },
        lng: "ja", // 初期言語
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;

const lang: string = await invoke("get_os_language");
i18n.changeLanguage(lang);
console.log("Language set to:", lang);
