import { isRejectedWithValue, MiddlewareAPI } from '@reduxjs/toolkit';

const redirectMiddleware = (store: MiddlewareAPI) => (next: Function) => (action: any) => {
    if (isRejectedWithValue(action)) {
        // Kiểm tra lỗi có mã status 401 hay không
        if (action.payload?.status === 401) {
            console.log('Global 401 handler: Redirecting to login...');
            // Chuyển hướng đến trang login, chỉ thực thi trên client
            if (typeof window !== 'undefined') {
                window.location.href = 'http://localhost:3000/auth/login';
            }
        }
    }
    return next(action);
};

export default redirectMiddleware;
