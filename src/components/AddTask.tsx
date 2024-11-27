"use client";

import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { useAddTaskMutation } from '@/store/apiSlice';
import { ITask } from '@/types/tasks';

interface AddTackProps {
    refetch: () => void; // Nhận refetch từ component cha
}

const AddTack = ({ refetch }: AddTackProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [taskValues, setTaskValues] = useState<string>('');
    const [addTask, { isLoading, isError, isSuccess }] = useAddTaskMutation();

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (taskValues.trim()) {
            try {
                // Tạo task theo đúng cấu trúc ITask
                const newTask: ITask = {
                    id: Date.now().toString(),
                    text: taskValues,
                };

                // Gửi task lên API
                const result = await addTask(newTask).unwrap();

                // Gọi lại refetch để làm mới danh sách task
                refetch();

                setTaskValues(''); // Reset input
                setModalOpen(false); // Đóng modal
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };

    return (
        <>
            <div>
                <button
                    className="btn btn-primary w-full"
                    onClick={() => setModalOpen(true)}
                    disabled={isLoading} // Disable khi đang thêm task
                >
                    {isLoading ? 'Adding...' : 'Add new task'}
                    <AiOutlinePlus className="ml-2" size={18} />
                </button>

                <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    <form onSubmit={handleSubmitNewTodo}>
                        <h3 className="font-bold text-lg">Add new task</h3>
                        <div className="modal-action">
                            <input
                                value={taskValues}
                                onChange={(e) => setTaskValues(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                disabled={isLoading} // Disable input khi đang xử lý
                            />
                            <button className="btn" type="submit" disabled={isLoading}>
                                Submit
                            </button>
                        </div>
                    </form>
                    {isError && <p className="text-red-500 mt-2">Failed to add task!</p>}
                    {isSuccess && <p className="text-green-500 mt-2">Task added successfully!</p>}
                </Modal>
            </div>
        </>
    );
};

export default AddTack;
