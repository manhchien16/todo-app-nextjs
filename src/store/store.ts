import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import { apiSlice } from "./apiSlice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        [apiSlice.reducerPath]: apiSlice.reducer, // Thêm apiSlice reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // Thêm middleware của RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
