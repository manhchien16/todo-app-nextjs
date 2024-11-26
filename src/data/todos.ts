// src/data/todos.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../types/tasks';

// Định nghĩa slice cho todos
const todosSlice = createSlice({
    name: 'todos',
    initialState: [] as ITask[], // Danh sách các tasks ban đầu là mảng rỗng
    reducers: {
        addTodo: (state, action: PayloadAction<ITask>) => {
            state.push(action.payload); // Thêm task mới vào danh sách
        },
    },
});

// Export action và reducer
export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
