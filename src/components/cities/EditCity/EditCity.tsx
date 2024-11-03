import React, { useEffect, useState } from "react";
import style from "./editCity.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTown, editTown, getOne } from "../../../store/town/townAction";
import { AppDispatch, RootState } from "../../../store/store";
import { CreateWeather } from "../../../helpers/const";
import { useParams } from "react-router-dom";
import { clearOne } from "../../../store/town/townSlice";

const EditCity: React.FC = () => {
    const { name, lang } = useParams<{ name: string; lang: string }>();
    const { oneWeather } = useSelector((state: RootState) => state.town);

    const nameObj = {
        name: name as string,
        lang: lang as string,
    };

    const [weatherEng, setWeatherEng] = useState<CreateWeather>({
        name: "",
        temperature: 0,
        day: "",
        humidity: 0,
        pressure: 0,
        wind: "",
        windSpeed: 0,
    });

    const [weatherRu, setWeatherRu] = useState<CreateWeather>({
        name: "",
        temperature: 0,
        day: "",
        humidity: 0,
        pressure: 0,
        wind: "",
        windSpeed: 0,
    });

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (
        field: keyof CreateWeather,
        value: string | number,
        isCommon: boolean = true
    ) => {
        if (isCommon) {
            setWeatherEng((prev) => ({ ...prev, [field]: value }));
            setWeatherRu((prev) => ({ ...prev, [field]: value }));
        } else {
            setWeatherEng((prev) => ({ ...prev, [field]: value }));
        }
    };

    useEffect(() => {
        if (name && lang) {
            dispatch(getOne({ name, lang }));
        }

        return () => {
            dispatch(clearOne());
        };
    }, [dispatch, name, lang]);

    useEffect(() => {
        if (oneWeather) {
            setWeatherEng({
                name: oneWeather.name,
                temperature: Number(oneWeather.temperature),
                day: oneWeather.day,
                humidity: Number(oneWeather.humidity),
                pressure: Number(oneWeather.pressure),
                wind: oneWeather.wind,
                windSpeed: Number(oneWeather.windSpeed),
            });
            setWeatherRu({
                name: oneWeather.name,
                temperature: Number(oneWeather.temperature),
                day: oneWeather.day,
                humidity: Number(oneWeather.humidity),
                pressure: Number(oneWeather.pressure),
                wind: oneWeather.wind,
                windSpeed: Number(oneWeather.windSpeed),
            });
        }
    }, [oneWeather]);

    const handleEditTown = async () => {
        await dispatch(editTown({ weatherEng, weatherRu, nameObj }));
        // navigate("/");
    };
    return (
        <div className={style.create_form}>
            <div className={style.reg_center}>
                <div className={style.registerDivValue}>Edit form</div>
            </div>
            <div className={style.regBlockCentr}>
                <div className={style.regBlock}>
                    <div className={style.rightRegPart}>
                        <div className={style.two_registerInp}>
                            {lang === "eng" ? (
                                <input
                                    className={style.registerInp}
                                    type="text"
                                    placeholder="Name"
                                    value={weatherEng.name}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "name",
                                            e.target.value,
                                            false
                                        )
                                    }
                                />
                            ) : (
                                <input
                                    className={style.registerInp}
                                    type="text"
                                    placeholder="имя"
                                    value={weatherRu.name}
                                    onChange={(e) =>
                                        setWeatherRu({
                                            ...weatherRu,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </div>
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="Temperature"
                            value={weatherEng.temperature}
                            onChange={(e) =>
                                handleInputChange(
                                    "temperature",
                                    Number(e.target.value)
                                )
                            }
                        />
                        <div className={style.two_registerInp}>
                            {lang === "eng" ? (
                                <input
                                    className={style.registerInp}
                                    type="text"
                                    placeholder="Day"
                                    value={weatherEng.day}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "day",
                                            e.target.value,
                                            false
                                        )
                                    }
                                />
                            ) : (
                                <input
                                    className={style.registerInp}
                                    type="text"
                                    placeholder="день"
                                    value={weatherRu.day}
                                    onChange={(e) =>
                                        setWeatherRu({
                                            ...weatherRu,
                                            day: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </div>
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="Humidity"
                            value={weatherEng.humidity}
                            onChange={(e) =>
                                handleInputChange(
                                    "humidity",
                                    Number(e.target.value)
                                )
                            }
                        />
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="Pressure"
                            value={weatherEng.pressure}
                            onChange={(e) =>
                                handleInputChange(
                                    "pressure",
                                    Number(e.target.value)
                                )
                            }
                        />
                        <div className={style.two_registerInp}>
                            {lang === "eng" ? (
                                <input
                                    className={style.registerInp}
                                    type="text"
                                    placeholder="Wind"
                                    value={weatherEng.wind}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "wind",
                                            e.target.value,
                                            false
                                        )
                                    }
                                />
                            ) : (
                                <input
                                    className={style.registerInp}
                                    type="text"
                                    placeholder="ветер"
                                    value={weatherRu.wind}
                                    onChange={(e) =>
                                        setWeatherRu({
                                            ...weatherRu,
                                            wind: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </div>
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="Wind Speed"
                            value={weatherEng.windSpeed}
                            onChange={(e) =>
                                handleInputChange(
                                    "windSpeed",
                                    Number(e.target.value)
                                )
                            }
                        />
                        <button
                            className={style.registerBtn}
                            onClick={handleEditTown}>
                            create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCity;
