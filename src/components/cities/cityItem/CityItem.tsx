import React, { useEffect, useState } from "react";
import styles from "./cityItem.module.scss";

interface CityItemProps {
    town: {
        name: string;
        temperature: string;
        day: string;
        humidity: string;
        pressure: number;
        wind: string;
    };
    isDayTheme: boolean | null;
    lang: string;
}

const CityItem: React.FC<CityItemProps> = ({ town, isDayTheme, lang }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>();

    useEffect(() => {
        const a = localStorage.getItem("isAdmin");
        setIsAdmin(a === "true");
    }, []);

    console.log(lang);

    return (
        <div
            className={`${styles.item} ${
                isDayTheme ? styles.day : styles.night
            }`}>
            {lang == "ru" ? (
                <div className={styles.item_inside}>
                    <p>{town.name}</p>
                    <h2>{town.temperature}С</h2>
                    <p>День: {town.day}</p>
                    <p>Влажность: {town.humidity}%</p>
                    <p>Давление: {town.pressure} мм рт. ст.</p>
                    <p>Ветер: {town.wind}</p>
                </div>
            ) : (
                <div className={styles.item_inside}>
                    <p>{town.name}</p>
                    <h2>{town.temperature}С</h2>
                    <p>day: {town.day}</p>
                    <p>humidity: {town.humidity}%</p>
                    <p>pressure: {town.pressure} mmHg Art.</p>
                    <p>wind: {town.wind}</p>
                </div>
            )}
        </div>
    );
};

export default CityItem;
