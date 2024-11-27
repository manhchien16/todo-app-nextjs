import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { customBaseQuery } from "./baseQuery";
import { IUser } from "@/types/users";

// export const authApiSlice = createApi({
//     reducerPath: "autApi",
//     baseQuery: customBaseQuery,
//     endpoints: (builder) => ({
//         getUsers: builder.query<IUser[], void>({
//             query: () => "users",
//         }),
//         getUserById: builder.query<IUser, string>({
//             query: (id) => `users/${id}`,
//         }),
//         regester: builder.


//     })
// })