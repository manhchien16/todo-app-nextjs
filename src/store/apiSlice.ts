import { ITask } from "@/types/tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery";

export const apiSlice = createApi({
    reducerPath: "api", // Định danh reducer trong store
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        // Lấy danh sách các task
        getTasks: builder.query<ITask[], void>({
            query: () => "todos",
        }),

        // Thêm mới một task
        addTask: builder.mutation<ITask, ITask>({
            query: (newTask) => ({
                url: "todos",
                method: "POST",
                body: newTask,
            }),
        }),

        // Cập nhật task (sửa text task)
        updateTaskText: builder.mutation<ITask, { id: string; text: string }>({
            query: ({ id, text }) => ({
                url: `todos/${id}`,
                method: "PUT",
                body: { text },
            }),
        }),

        // Xóa task theo ID
        deleteTask: builder.mutation<null, string>({
            query: (id) => ({
                url: `todos/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskTextMutation,
    useDeleteTaskMutation,
} = apiSlice;
