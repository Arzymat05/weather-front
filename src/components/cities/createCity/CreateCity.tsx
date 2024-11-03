import React, { useState } from "react";
import style from "./createCity.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTown } from "../../../store/town/townAction";
import { AppDispatch } from "../../../store/store";
import { CreateWeather } from "../../../helpers/const";

const CreateCity: React.FC = () => {
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

    return (
        <div className={style.create_form}>
            <div className={style.reg_center}>
                <div className={style.registerDivValue}>Create form</div>
            </div>
            <div className={style.regBlockCentr}>
                <div className={style.regBlock}>
                    <div className={style.rightRegPart}>
                        <div className={style.two_registerInp}>
                            <input
                                className={style.registerInp}
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    handleInputChange(
                                        "name",
                                        e.target.value,
                                        false
                                    )
                                }
                            />
                            <input
                                className={style.registerInp}
                                type="text"
                                placeholder="имя"
                                onChange={(e) =>
                                    setWeatherRu({
                                        ...weatherRu,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="Temperature"
                            onChange={(e) =>
                                handleInputChange(
                                    "temperature",
                                    Number(e.target.value)
                                )
                            }
                        />
                        <div className={style.two_registerInp}>
                            <input
                                className={style.registerInp}
                                type="text"
                                placeholder="Day"
                                onChange={(e) =>
                                    handleInputChange(
                                        "day",
                                        e.target.value,
                                        false
                                    )
                                }
                            />
                            <input
                                className={style.registerInp}
                                type="text"
                                placeholder="день"
                                onChange={(e) =>
                                    setWeatherRu({
                                        ...weatherRu,
                                        day: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="Humidity"
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
                            onChange={(e) =>
                                handleInputChange(
                                    "pressure",
                                    Number(e.target.value)
                                )
                            }
                        />

                        <div className={style.two_registerInp}>
                            <input
                                className={style.registerInp}
                                type="text"
                                placeholder="Wind"
                                onChange={(e) =>
                                    handleInputChange(
                                        "wind",
                                        e.target.value,
                                        false
                                    )
                                }
                            />

                            <input
                                className={style.registerInp}
                                type="text"
                                placeholder="ветер"
                                onChange={(e) =>
                                    setWeatherRu({
                                        ...weatherRu,
                                        wind: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <input
                            className={style.registerInp}
                            type="number"
                            placeholder="wind speed"
                            onChange={(e) =>
                                handleInputChange(
                                    "windSpeed",
                                    Number(e.target.value)
                                )
                            }
                        />

                        <button
                            className={style.registerBtn}
                            onClick={() => {
                                dispatch(createTown({ weatherEng, weatherRu }));
                                navigate("/");
                            }}>
                            create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCity;
