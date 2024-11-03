import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Инициализация i18n
i18n.use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en", // Язык по умолчанию
        debug: true,
        interpolation: {
            escapeValue: false, // React автоматически экранирует строки, это можно отключить
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json", // Путь к JSON файлам
        },
    });

export default i18n;
