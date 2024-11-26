
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from "./Modal";
import { useDispatch } from "react-redux"; // Import useDispatch từ Redux
import { removeTask, updateTaskText } from "@/store/slices/taskSlice"; // Import các action

interface TaskProps {
    task: ITask; // Prop kiểu ITask
    onRemove: (id: string) => void; // Thêm prop onRemove
}

const Task: React.FC<TaskProps> = ({ task, onRemove }) => { // Thêm onRemove vào đây
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const dispatch = useDispatch(); // Khởi tạo useDispatch để gọi các action

    // Hàm xử lý khi chỉnh sửa task
    const handleEditNewTodo: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Gửi action để cập nhật task trong Redux store
        dispatch(updateTaskText({ id: task.id, text: taskToEdit }));
        setOpenModalEdit(false); // Đóng modal sau khi chỉnh sửa
    };

    // Hàm xử lý xóa task
    const handleDeleteTask = () => {
        onRemove(task.id); // Gọi hàm onRemove từ prop để xóa task
    };

    return (
        <tr>
            <th>{task.id}</th> {/* Hiển thị ID task */}
            <td className="w-full">{task.text}</td> {/* Hiển thị nội dung task */}
            <td className="flex gap-5">
                {/* Nút chỉnh sửa */}
                <FiEdit
                    cursor="pointer"
                    className="text-blue-500"
                    size={25}
                    onClick={() => setOpenModalEdit(true)}
                />
                {/* Modal chỉnh sửa task */}
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleEditNewTodo}>
                        <h3 className='font-bold text-lg'>Edit Task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Edit task text"
                                className="input input-bordered w-full"
                            />
                            <button className='btn' type='submit'>Submit</button>
                        </div>
                    </form>
                </Modal>

                {/* Nút xóa task */}
                <FiTrash2
                    cursor="pointer"
                    className="text-red-500"
                    size={25}
                    onClick={handleDeleteTask}
                />
            </td>
        </tr>
    );
};

export default Task;
