import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import { ApiTaskSlice } from './service/ApiTaskSlice';
import redirectMiddleware from './middleware/redirectMiddleware';

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        [ApiTaskSlice.reducerPath]: ApiTaskSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ApiTaskSlice.middleware, redirectMiddleware), // Thêm middleware của RTK Query và middleware tùy chỉnh
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;