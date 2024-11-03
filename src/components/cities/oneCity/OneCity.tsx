import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteOne, getOne } from "../../../store/town/townAction";
import { clearOne } from "../../../store/town/townSlice";
import { Chart, registerables } from "chart.js";
import style from "./oneCity.module.scss";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const OneCity: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { name, lang } = useParams<{ name: string; lang: string }>();
    const { oneWeather } = useSelector((state: RootState) => state.town);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const navigate = useNavigate();

    const [temperature, setTemperature] = useState({
        current: 0,
        min: 0,
        max: 0,
        feelsLike: 0,
    });
    const [isFahrenheit, setIsFahrenheit] = useState(false);

    const convertToFahrenheit = (tempC: number) => (tempC * 9) / 5 + 32;

    useEffect(() => {
        if (name && lang) {
            dispatch(getOne({ name, lang }));
        }

        return () => {
            dispatch(clearOne());
        };
    }, [dispatch, name, lang]);

    useEffect(() => {
        if (oneWeather?.temperature) {
            const avgTemp = parseFloat(oneWeather.temperature);
            const delta = 5;

            setTemperature({
                current: avgTemp,
                min: avgTemp - delta,
                max: avgTemp + delta,
                feelsLike: avgTemp - 2,
            });
        }
    }, [oneWeather]);

    const data = {
        labels: ["Min", "Current", "Feels Like", "Max"],
        datasets: [
            {
                label: `Temperature (°${isFahrenheit ? "F" : "C"})`,
                data: [
                    isFahrenheit
                        ? convertToFahrenheit(temperature.min)
                        : temperature.min,
                    isFahrenheit
                        ? convertToFahrenheit(temperature.current)
                        : temperature.current,
                    isFahrenheit
                        ? convertToFahrenheit(temperature.feelsLike)
                        : temperature.feelsLike,
                    isFahrenheit
                        ? convertToFahrenheit(temperature.max)
                        : temperature.max,
                ],
                fill: false,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };

    useEffect(() => {
        const getAdmin = () => {
            const admin = localStorage.getItem("isAdmin");
            setIsAdmin(admin == "true");
        };
        getAdmin();
    }, []);

    return (
        <>
            {lang == "ru" ? (
                <div className={style.oneWeather}>
                    <div className={style.oneWeather_center}>
                        <div className={style.main_info}>
                            <div></div>
                            <div>
                                <h2>{oneWeather?.name}</h2>
                                <p>{oneWeather?.day}</p>
                            </div>
                        </div>
                        <div className={style.temperature}>
                            <div className={style.temperature_icon}>
                                <img
                                    src="https://cdn.icon-icons.com/icons2/1719/PNG/512/3856401-celsius-degrees-temperature-thermometer-weather_112774.png"
                                    alt=""
                                />
                            </div>
                            <div className={style.temperature_info_block}>
                                <div className={style.temperature_info}>
                                    <p>
                                        Температура:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.current
                                              ).toFixed(1)
                                            : temperature.current}
                                        °{isFahrenheit ? "F" : "C"}
                                    </p>
                                    <p>
                                        Мин.:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.min
                                              ).toFixed(1)
                                            : temperature.min}
                                        °{isFahrenheit ? "F" : "C"}, Макс.:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.max
                                              ).toFixed(1)
                                            : temperature.max}
                                        °{isFahrenheit ? "F" : "C"}, Ощущается
                                        как:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.feelsLike
                                              ).toFixed(1)
                                            : temperature.feelsLike}
                                        °{isFahrenheit ? "F" : "C"}
                                    </p>
                                </div>
                                <button
                                    className={style.btn}
                                    onClick={() =>
                                        setIsFahrenheit(!isFahrenheit)
                                    }>
                                    →
                                </button>
                            </div>
                        </div>
                        <div className={style.hpw}>
                            <div></div>
                            <div>
                                <p>Влажность: {oneWeather?.humidity}%</p>
                                <p>Давление: {oneWeather?.pressure} hPa</p>
                                <p>Ветер: {oneWeather?.wind}</p>
                                <p>wind speed: {oneWeather?.windSpeed} km/h</p>
                            </div>
                        </div>

                        <div className={style.graphic}>
                            <Line
                                data={data}
                                style={{ width: "50%", height: "auto" }}
                            />
                            {isAdmin ? (
                                <>
                                    <div className="">
                                        <div className={style.admin_btns}>
                                            <button
                                                className={style.btn}
                                                onClick={() => {
                                                    if (name && lang) {
                                                        const nameObj = {
                                                            name: name,
                                                            lang: lang,
                                                        };
                                                        dispatch(
                                                            deleteOne(nameObj)
                                                        );
                                                    } else {
                                                        console.error(
                                                            "Name or language is undefined"
                                                        );
                                                    }
                                                }}>
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/73/73806.png"
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                className={style.btn}
                                                onClick={() => {
                                                    navigate(
                                                        `/weather/edit/${name}/${lang}`
                                                    );
                                                    window.location.reload();
                                                }}>
                                                <img
                                                    src="https://static.vecteezy.com/system/resources/previews/019/552/595/non_2x/sign-up-icon-signup-square-box-on-transparent-background-free-png.png"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.oneWeather}>
                    <div className={style.oneWeather_center}>
                        <div className={style.main_info}>
                            <div></div>
                            <div>
                                <h2>{oneWeather?.name}</h2>
                                <p>{oneWeather?.day}</p>
                            </div>
                        </div>
                        <div className={style.temperature}>
                            <div className={style.temperature_icon}>
                                <img
                                    src="https://cdn.icon-icons.com/icons2/1719/PNG/512/3856401-celsius-degrees-temperature-thermometer-weather_112774.png"
                                    alt=""
                                />
                            </div>
                            <div className={style.temperature_info_block}>
                                <div className={style.temperature_info}>
                                    <p>
                                        temperature:
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.current
                                              ).toFixed(1)
                                            : temperature.current}
                                        °{isFahrenheit ? "F" : "C"}
                                    </p>
                                    <p>
                                        Min.:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.min
                                              ).toFixed(1)
                                            : temperature.min}
                                        °{isFahrenheit ? "F" : "C"}, Max.:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.max
                                              ).toFixed(1)
                                            : temperature.max}
                                        °{isFahrenheit ? "F" : "C"}, Filing
                                        like:{" "}
                                        {isFahrenheit
                                            ? convertToFahrenheit(
                                                  temperature.feelsLike
                                              ).toFixed(1)
                                            : temperature.feelsLike}
                                        °{isFahrenheit ? "F" : "C"}
                                    </p>
                                </div>
                                <button
                                    className={style.btn}
                                    onClick={() =>
                                        setIsFahrenheit(!isFahrenheit)
                                    }>
                                    →
                                </button>
                            </div>
                        </div>
                        <div className={style.hpw}>
                            <div></div>
                            <div>
                                <p>humidity: {oneWeather?.humidity}%</p>
                                <p>pressure: {oneWeather?.pressure} hPa</p>
                                <p>wind: {oneWeather?.wind}</p>
                                <p>wind speed: {oneWeather?.windSpeed}</p>
                            </div>
                        </div>

                        <div className={style.graphic}>
                            <Line
                                data={data}
                                style={{ width: "50%", height: "auto" }}
                            />
                            {isAdmin ? (
                                <>
                                    <div className="">
                                        <div className={style.admin_btns}>
                                            <button
                                                className={style.btn}
                                                onClick={() => {
                                                    if (name && lang) {
                                                        dispatch(
                                                            deleteOne({
                                                                name,
                                                                lang,
                                                            })
                                                        );
                                                    } else {
                                                        console.error(
                                                            "Name or language is undefined"
                                                        );
                                                    }
                                                }}>
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/73/73806.png"
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                className={style.btn}
                                                onClick={() => {
                                                    navigate(
                                                        `/weather/edit/${name}/${lang}`
                                                    );
                                                    window.location.reload();
                                                }}>
                                                <img
                                                    src="https://static.vecteezy.com/system/resources/previews/019/552/595/non_2x/sign-up-icon-signup-square-box-on-transparent-background-free-png.png"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OneCity;
