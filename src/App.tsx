import React, { useEffect, useState } from "react";
import MainRoutes from "./mainRoutes/MainRoutes";
import Navbar from "./components/navbar/Navbar";
import "./style.scss";
import { getTheme } from "./helpers/helpers";

const App: React.FC = () => {
    const [isDayTheme, setIsDayTheme] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchTheme = async () => {
            const theme = await getTheme();
            setIsDayTheme(theme === "day");
        };

        fetchTheme();
    }, []);

    useEffect(() => {
        if (isDayTheme !== null) {
            if (isDayTheme) {
                document.body.classList.add("day");
                document.body.classList.remove("night");
            } else {
                document.body.classList.add("night");
                document.body.classList.remove("day");
            }
        }
    }, [isDayTheme]);

    return (
        <div className={`app ${isDayTheme ? "day" : "night"}`}>
            <Navbar />
            <MainRoutes />
        </div>
    );
};

export default App;
