"use client";
import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskTextMutation } from "@/store/apiSlice"; // Import hook từ apiSlice
import { ITask } from "@/types/tasks"; // Import ITask từ types
import Task from "@/components/Task"; // Import component Task để hiển thị
import { useEffect, useState } from "react";
import AddTack from "@/components/AddTask"; // Import AddTask component

const TodoLish = () => {
    const { data: tasks = [], isLoading, isError, error, refetch } = useGetTasksQuery(undefined);
    const [deleteTask, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteTaskMutation(); // Hook để xóa task
    const [updateTaskText, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateTaskTextMutation(); // Hook để update task

    const [editingTask, setEditingTask] = useState<ITask | null>(null); // State để lưu task đang được chỉnh sửa
    const [newText, setNewText] = useState<string>(""); // State để lưu text mới khi chỉnh sửa

    const handleRemoveTask = async (id: string) => {
        try {
            await deleteTask(id).unwrap();
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTask && newText.trim()) {
            try {
                // Gọi API để update task
                await updateTaskText({ id: editingTask.id, text: newText }).unwrap();
                setEditingTask(null);
            } catch (err) {
                console.error('Failed to update task:', err);
            }
        }
    };

    // useEffect theo dõi sự thay đổi khi xóa task thành công
    useEffect(() => {
        if (isDeleteSuccess) {
            console.log("Task deleted successfully");
            refetch();
        }
    }, [isDeleteSuccess, isUpdateSuccess, refetch]);

    // useEffect theo dõi khi có lỗi trong quá trình xóa task
    useEffect(() => {
        if (isDeleteError) {
            console.error("Failed to delete task");
        }
    }, [isDeleteError, isUpdateSuccess]);

    if (isLoading) return <div>Loading tasks...</div>;
    if (isError) return <div>Error loading tasks</div>;

    return (
        <>
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">TODO LISH APP</h1>
                <AddTack refetch={refetch} />
            </div>

            {/* Modal edit task */}
            {editingTask && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Edit Task</h2>
                        <form onSubmit={handleUpdateTask}>
                            <input
                                type="text"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Edit task text"
                            />
                            <div className="modal-action">
                                <button className="btn" type="submit">
                                    Update Task
                                </button>
                                <button className="btn" type="button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                    onEdit={() => {
                                        setEditingTask(task);
                                        setNewText(task.text);
                                    }}
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