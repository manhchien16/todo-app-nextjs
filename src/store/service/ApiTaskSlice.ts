import { ITask } from "@/types/tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./Https";

export const ApiTaskSlice = createApi({
    reducerPath: "api", // Định danh reducer trong store
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        // Lấy danh sách các task
        getTasks: builder.query<ITask[], void>({
            // query: () => "todos",
            queryFn: () => {
                return {
                    error: {
                        status: 401,
                        data: 'Tasks not found',
                    },
                };
            }
        }),
        // tìm kiếm tasks
        getTaskByName: builder.query<ITask, { text: string }>({
            query: ({ text }) => ({
                url: `todos?text=${text}`,
                method: "GET",
            }),
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
    useGetTaskByNameQuery,
    useLazyGetTaskByNameQuery,
    useAddTaskMutation,
    useUpdateTaskTextMutation,
    useDeleteTaskMutation,
} = ApiTaskSlice;