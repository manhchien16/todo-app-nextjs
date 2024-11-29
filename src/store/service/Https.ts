import { BASE_API } from "@/app/lib/constants/App";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom baseQuery with error handling
export const customBaseQuery = fetchBaseQuery({
    baseUrl: BASE_API,
    fetchFn: async (input, init, ...rest) => {
        const response = await fetch(input, init);

        if (!response.ok) {
            const status = response.status;
            const message = `Error ${status}: ${response.statusText}`;

            console.log(`Error detected: ${status}`); // Thêm log kiểm tra

            if (status === 401) {
                console.log("Redirecting to login...");
                window.location.href = "http://localhost:3000/auth/login";
            }

            // Ném lỗi với thông tin chi tiết
            const error = new Error(message);
            (error as any).status = status;
            throw error;
        }

        return response;
    },
});
