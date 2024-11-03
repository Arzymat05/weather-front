import React, { useState, useEffect } from "react";
import style from "./admin.module.scss";
import { isAdmin } from "../../store/admin/adminAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const dispatch: AppDispatch = useDispatch();
    const [user, setUser] = useState<Object>({
        name: "",
        password: "",
    });
    const navigate = useNavigate();

    return (
        <>
            <div className={style.reg_center}>
                <div className={style.registerDivValue}>login form</div>
            </div>

            <div className={style.regBlockCentr}>
                <div className={style.regBlock}>
                    <div className={style.leftregPart}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
                            alt=""
                        />
                    </div>
                    <div className={style.rightRegPart}>
                        <input
                            className={style.registerInp}
                            type="text"
                            placeholder="Username"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            className={style.registerInp}
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />

                        <button
                            className={style.registerBtn}
                            onClick={() => {
                                dispatch(isAdmin({ user, navigate }));
                            }}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
