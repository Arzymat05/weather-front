import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import CardTheme from "./CardTheme";
import CardLanguage from "./CardLanguage";
import { getLanguages, getTheme } from "../../helpers/helpers";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const [isDayTheme, setIsDayTheme] = useState<boolean | null>(null);
    const [lang, setLang] = useState<string>("ru");

    useEffect(() => {
        const fetchTheme = async () => {
            const theme = await getTheme();
            setIsDayTheme(theme === "day");
        };

        fetchTheme();
    }, []);
    useEffect(() => {
        const fetchLang = async () => {
            const language = await getLanguages();
            setLang(language);
        };

        fetchLang();
    }, []);

    return (
        <div
            className={`${styles.home} ${
                isDayTheme ? styles.day : styles.night
            }`}>
            <div className={styles.intro}>
                <div className=""></div>
                <div className={styles.main_intro_info}>
                    {lang == "ru" ? (
                        <>
                            <h1>Добро пожаловать в наше погодное приложение</h1>
                            <p>
                                Откройте для себя последние обновления погоды
                                для вашего города с такими функциями, как
                                автозаполнение, отображение температуры
                                (текущая, максимальная, минимальная), влажности
                                и давления.
                            </p>
                        </>
                    ) : (
                        <>
                            {" "}
                            <h1>Welcome to Our Weather App</h1>
                            <p>
                                Discover the latest weather updates for your
                                city, with features like auto-complete,
                                temperature displays (current, max, min),
                                humidity, pressure
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.cardContainer}>
                {lang == "ru" ? (
                    <>
                        {isDayTheme ? (
                            <>
                                <CardTheme
                                    title="ночная"
                                    description="тема"
                                    icon="https://cdn2.iconfinder.com/data/icons/iot-outline/128/ic_theme_switch-512.png"
                                />
                            </>
                        ) : (
                            <>
                                <CardTheme
                                    title="дневная"
                                    description="тема"
                                    icon="https://cdn2.iconfinder.com/data/icons/iot-outline/128/ic_theme_switch-512.png"
                                />
                            </>
                        )}
                        <CardLanguage
                            title="язык"
                            description="переключение"
                            icon="https://img.icons8.com/?size=512&id=13647&format=png"
                        />
                    </>
                ) : (
                    <>
                        {isDayTheme ? (
                            <>
                                <CardTheme
                                    title="night"
                                    description="theme"
                                    icon="https://cdn2.iconfinder.com/data/icons/iot-outline/128/ic_theme_switch-512.png"
                                />
                            </>
                        ) : (
                            <>
                                <CardTheme
                                    title="day"
                                    description="theme"
                                    icon="https://cdn2.iconfinder.com/data/icons/iot-outline/128/ic_theme_switch-512.png"
                                />
                            </>
                        )}
                        <CardLanguage
                            title="Language"
                            description="Toggle"
                            icon="https://img.icons8.com/?size=512&id=13647&format=png"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
