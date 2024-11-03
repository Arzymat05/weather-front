import { combineReducers, configureStore } from "@reduxjs/toolkit";
import townReducer from "./town/townSlice";
import adminSlice from "./admin/adminSlice";

const rootReducer = combineReducers({
    town: townReducer,
    admin: adminSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
