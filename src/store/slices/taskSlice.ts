import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '@/types/tasks';

interface TaskState {
    tasks: ITask[];
}

const initialState: TaskState = {
    tasks: []
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        addTask(state, action: PayloadAction<ITask>) {
            state.tasks.push(action.payload);
        },
        updateTaskText(state, action: PayloadAction<{ id: string, text: string }>) {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
            }
        }
    }
});

export const { removeTask, addTask, updateTaskText } = taskSlice.actions;
export default taskSlice.reducer;
