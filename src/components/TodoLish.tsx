import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskTextMutation } from "@/store/apiSlice"; // Import hook từ apiSlice
import { ITask } from "@/types/tasks"; // Import ITask từ types
import Task from "./Task"; // Import component Task để hiển thị
import { useEffect, useState } from "react";
import AddTack from "./AddTask"; // Import AddTask component
import Swal from "sweetalert2";

const TodoLish = () => {
    const { data: tasks = [], isLoading, isError, error, refetch } = useGetTasksQuery(undefined);
    const [deleteTask, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteTaskMutation(); // Hook để xóa task
    const [updateTaskText, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateTaskTextMutation(); // Hook để update task

    const [editingTask, setEditingTask] = useState<ITask | null>(null);

    const handleRemoveTask = async (id: string) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn sửa task này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
        });

        if (result.isConfirmed) {
            try {
                await deleteTask(id).unwrap();
                Swal.fire('Thành công!', 'xoá task thành công.', 'success');
            } catch (err) {
                console.error('Failed to delete task:', err);
                Swal.fire('Thất bại!', 'xoá task không thành công.', 'error');
            }
        }
    };

    const handleUpdateTask = async (id: string, text: string) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn sửa task này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
        });

        if (result.isConfirmed) {
            console.log("Updating task:", { id, text });
            try {
                await updateTaskText({ id, text }).unwrap();
                setEditingTask(null); // Đặt lại task đang chỉnh sửa
                Swal.fire('Thành công!', 'Sửa thông tin thành công.', 'success');
            } catch (err) {
                console.error('Error updating task:', err);
                Swal.fire('Thất bại!', 'Sửa thông tin không thành công.', 'error');
            }
        }
    };



    // useEffect theo dõi sự thay đổi khi xóa task thành công
    useEffect(() => {
        if (isDeleteSuccess || isUpdateSuccess) {
            console.log("Task successfully");
            refetch();
        } else {
            console.error("Failed to api");
        }
    }, [isDeleteSuccess, isUpdateSuccess, refetch]);

    if (isLoading) return <div>Loading tasks...</div>;
    if (isError) return <div>Error loading tasks</div>;

    return (
        <>
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">TODO LISH APP</h1>
                <AddTack refetch={refetch} />
            </div>
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
                        {tasks.length > 0 ? (
                            tasks.map((task: ITask) => (
                                <Task
                                    key={task.id}
                                    task={task}
                                    onRemove={() => handleRemoveTask(task.id)}
                                    onEdit={(id: string, text: string) => handleUpdateTask(id, text)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TodoLish;
