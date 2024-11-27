import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from "./Modal";
import Swal from "sweetalert2";

interface TaskProps {
    task: ITask; // Prop kiểu ITask
    onRemove: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onRemove, onEdit }) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    console.log(taskToEdit);


    // Hàm xử lý khi chỉnh sửa task
    const handleEditNewTodo = (e: React.FormEvent) => {
        e.preventDefault();
        onEdit(task.id, taskToEdit);
        setOpenModalEdit(false);
    };


    // Hàm xử lý xóa task
    const handleDeleteTask = () => {
        onRemove(task.id.toString());
    };

    return (
        <tr>
            <th>{task.id}</th>
            <td className="w-full">{task.text}</td>
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
                    <form>
                        <h3 className='font-bold text-lg'>Edit Task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Edit task text"
                                className="input input-bordered w-full"
                            />
                            <button onClick={(e) => { handleEditNewTodo(e) }} className='btn' type='button'>Submit</button>
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
