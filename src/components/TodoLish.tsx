
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import RootState từ store
import { ITask } from "@/types/tasks"; // Import ITask từ types/tasks.ts
import { removeTask } from "@/store/slices/taskSlice"; // Import action từ slice
import Task from "./Task";

const TodoLish = () => {
    // Lấy danh sách các task từ Redux store
    const tasks: ITask[] = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch();

    const handleRemoveTask = (id: string) => {
        dispatch(removeTask(id)); // Gửi action để xóa task
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onRemove={handleRemoveTask}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoLish;
