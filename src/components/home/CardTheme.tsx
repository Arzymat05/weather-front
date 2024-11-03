import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { changeTheme } from "../../helpers/helpers";

interface CardProps {
    title: string;
    description: string;
    icon: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
    const [theme, setTheme] = useState<boolean>(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme !== null) {
            setTheme(JSON.parse(savedTheme));
        }
    }, []);

    const handleThemeChange = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        changeTheme(newTheme);

        window.location.reload();
    };

    return (
        <div className={`${styles.card} ${theme ? styles.light : styles.dark}`}>
            <div className={styles.icon}>
                <img src={icon} alt={`${title} icon`} />
            </div>
            <div className={styles.card_center}>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <button
                    className={styles.exploreButton}
                    onClick={() => {
                        handleThemeChange();
                    }}>
                    {theme ? (
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/597/597527.png"
                            alt=""
                        />
                    ) : (
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/624/624106.png"
                            alt=""
                        />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Card;

// Bishkek

// 1324224
// День: Friday

// Влажность: 143524%

// Давление: 65 мм рт. ст.

// Ветер: Windy
