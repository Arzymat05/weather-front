import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTowns } from "../../../store/town/townAction";
import { AppDispatch, RootState } from "../../../store/store";
import CityItem from "../cityItem/CityItem";
import styles from "./cityList.module.scss";
import {
    getLanguages,
    translateWeatherData,
    getTheme,
} from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const GetCity: React.FC = () => {
    const [isDayTheme, setIsDayTheme] = useState<boolean | null>(null);
    const [lang, setLang] = useState<string>("ru");
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");

    const { weatherArr, loading, error } = useSelector(
        (state: RootState) => state.town
    );

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

    useEffect(() => {
        const fetchTowns = async () => {
            await dispatch(getTowns(lang));
        };
        fetchTowns();
    }, [dispatch, lang]);

    const filteredCities = weatherArr.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {loading ? (
                <>loading...</>
            ) : error ? (
                <>{error}</>
            ) : (
                <div
                    className={`${styles.list} ${
                        isDayTheme ? styles.day : styles.night
                    }`}>
                    <h2>Прогноз погоды</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.list_center}>
                        {filteredCities.map((town) => (
                            <div
                                key={town.id}
                                onClick={() => {
                                    navigate(`/weather/${town.name}/${lang}`);
                                }}>
                                <CityItem
                                    town={town}
                                    isDayTheme={isDayTheme}
                                    lang={lang}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetCity;
