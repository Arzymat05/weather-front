import React, { useState, useEffect } from "react";
import style from "../createCity/createCity.module.scss";

const UpdateCity = () => {
    const [city, setCity] = useState<Object>({
        temperature: "",
        day: "",
        humidity: "",
        pressure: "",
        wind: "",
    });

    return (
        <>
            <div className={style.reg_center}>
                <div className={style.registerDivValue}>Create form</div>
            </div>

            <div className={style.regBlockCentr}>
                <div className={style.regBlock}>
                    <div className={style.rightRegPart}>
                        <input
                            className={style.registerInp}
                            type="text"
                            placeholder="Temperature"
                            onChange={(e) =>
                                setCity({
                                    ...city,
                                    temperature: e.target.value,
                                })
                            }
                        />

                        <input
                            className={style.registerInp}
                            type="text"
                            placeholder="Day"
                            onChange={(e) =>
                                setCity({
                                    ...city,
                                    day: e.target.value,
                                })
                            }
                        />
                        <input
                            className={style.registerInp}
                            type="text"
                            placeholder="Humidity"
                            onChange={(e) =>
                                setCity({
                                    ...city,
                                    humidity: e.target.value,
                                })
                            }
                        />
                        <input
                            className={style.registerInp}
                            type="text"
                            placeholder="Pressure"
                            onChange={(e) =>
                                setCity({
                                    ...city,
                                    pressure: e.target.value,
                                })
                            }
                        />
                        <input
                            className={style.registerInp}
                            type="text"
                            placeholder="Wind"
                            onChange={(e) =>
                                setCity({
                                    ...city,
                                    wind: e.target.value,
                                })
                            }
                        />

                        <button className={style.registerBtn}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateCity;
