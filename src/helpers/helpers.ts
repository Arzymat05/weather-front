import { getTowns } from "../store/town/townAction";

// Определяем интерфейс для погоды
export interface WeatherData {
    id: number;
    name: string;
    temperature: string;
    day: string;
    humidity: string;
    pressure: number;
    wind: string;
}

// Функция для перевода данных погоды
export const translateWeatherData = async (
    data: WeatherData[]
): Promise<WeatherData[]> => {
    const translatedData = await Promise.all(
        data.map(async (item: WeatherData) => {
            const nameResponse = await fetch(
                `/translate?text=${item.name}&lang=en`
            );
            const dayResponse = await fetch(
                `/translate?text=${item.day}&lang=en`
            );
            const windResponse = await fetch(
                `/translate?text=${item.wind}&lang=en`
            );

            const nameData = await nameResponse.json();
            const dayData = await dayResponse.json();
            const windData = await windResponse.json();

            return {
                ...item,
                name: nameData.translatedText || item.name, // Извлекаем переведенный текст
                day: dayData.translatedText || item.day,
                wind: windData.translatedText || item.wind,
            };
        })
    );

    return translatedData;
};

export const changeTheme = (theme: boolean) => {
    const res = localStorage.setItem("theme", JSON.stringify(theme));
    return res;
};

export const getTheme = async () => {
    const newTheme = localStorage.getItem("theme");
    if (newTheme == "false" || newTheme == null) {
        return "day";
    } else {
        return "night";
    }
};

export const toggleLanguages = (newLang: boolean) => {
    const res = localStorage.setItem("language", JSON.stringify(newLang));
    return res;
};
export const getLanguages = async () => {
    const savedLang = localStorage.getItem("language");
    return savedLang === "true" ? "ru" : "eng";
};
