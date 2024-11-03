import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import logo from "../../img/logo.png";
import { getTowns } from "../../store/town/townAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../helpers/helpers";

const Navbar: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>();
    const [search, setSearch] = useState<string>("");
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isDayTheme, setIsDayTheme] = useState<boolean | null>(null);

    const [activeTab, setActiveTab] = useState<string>(() => {
        return localStorage.getItem("activeTab") || "Home";
    });

    const getSliderPosition = () => {
        switch (activeTab) {
            case "Home":
                return "5px";
            case "weather":
                return "105px";
            case "Admin":
                return "215px";
            default:
                return "5px";
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
    };

    useEffect(() => {
        const fetchTheme = async () => {
            const theme = await getTheme();
            setIsDayTheme(theme === "day");
        };
        const a = localStorage.getItem("isAdmin");
        setIsAdmin(a === "true");

        fetchTheme();
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <nav className={styles.navBar_center}>
            <div className={styles.navBar_center_2}>
                <div className={styles.navBar}>
                    <div
                        className={styles.navBar__slider}
                        style={{ left: getSliderPosition() }}
                    />
                    <div
                        className={`${styles.navBar__item} ${
                            activeTab === "Home"
                                ? styles["navBar__item--active"]
                                : ""
                        }`}
                        onClick={() => {
                            setActiveTab("Home");
                            navigate("/");
                        }}>
                        Home
                    </div>
                    <div
                        className={`${styles.navBar__item} ${
                            activeTab === "weather"
                                ? styles["navBar__item--active"]
                                : ""
                        }`}
                        onClick={() => {
                            setActiveTab("weather");
                            navigate("/weather");
                        }}>
                        weather
                    </div>

                    {isAdmin ? (
                        <>
                            <div
                                className={`${styles.navBar__item} ${
                                    activeTab === "Admin"
                                        ? styles["navBar__item--active"]
                                        : ""
                                }`}
                                onClick={() => {
                                    setActiveTab("Admin");
                                    navigate("/create");
                                }}>
                                create
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={`${styles.navBar__item} ${
                                    activeTab === "Admin"
                                        ? styles["navBar__item--active"]
                                        : ""
                                }`}
                                onClick={() => {
                                    setActiveTab("Admin");
                                    navigate("/admin");
                                }}>
                                Admin
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
