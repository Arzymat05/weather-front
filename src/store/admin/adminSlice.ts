import { createSlice } from "@reduxjs/toolkit";
import { isAdmin } from "./adminAction";

interface AdminState {
    isAdmin: boolean;
}
const initialState: AdminState = {
    isAdmin: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(isAdmin.fulfilled, (state, action) => {
            state.isAdmin = action.payload.isAdmin;
            localStorage.setItem("isAdmin", action.payload.isAdmin);

            if (action.payload.isAdmin) {
                action.payload.navigate("/create");
                window.location.reload();
            } else {
                action.payload.navigate("/error");
            }
        });
    },
});

export default adminSlice.reducer;
