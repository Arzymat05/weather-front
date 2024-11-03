import { createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "../../helpers/const";
import axios from "axios";

interface IsAdminParams {
    user: any;
    navigate: (path: string) => void;
}

export const isAdmin = createAsyncThunk(
    "town/isAdmin",
    async ({ user, navigate }: IsAdminParams) => {
        const res = await axios.post(`${weatherApi}/admin`, user);
        return { isAdmin: res.data, navigate };
    }
);
