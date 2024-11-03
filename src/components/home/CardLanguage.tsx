import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { toggleLanguages } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

interface CardProps {
    title: string;
    description: string;
    icon: string;
}

const CardLanguage: React.FC<CardProps> = ({ title, description, icon }) => {
    const [lang, setLang] = useState<boolean>(true);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang !== null) {
            setLang(JSON.parse(savedLang));
            toggleLanguages(JSON.parse(savedLang));
        }
    }, []);

    const handleLangChange = () => {
        const newLang = !lang;
        setLang(newLang);
        toggleLanguages(newLang);

        window.location.reload();
    };

    return (
        <div className={styles.card}>
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
                    onClick={handleLangChange}>
                    →
                </button>
            </div>
        </div>
    );
};

export default CardLanguage;
