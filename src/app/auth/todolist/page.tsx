'use client';
import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskTextMutation, useGetTaskByNameQuery, useLazyGetTaskByNameQuery } from "@/store/service/ApiTaskSlice";
import { ITask } from "@/types/tasks";
import Task from "@/components/Task";
import { useEffect, useState } from "react";
import AddTack from "@/components/AddTask";
import Swal from "sweetalert2";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";

const TodoLish = () => {
    const [taskByApi, setTaskByApi] = useState<any>();
    const [searchText, setSearchText] = useState<string>('');
    // const { data: taskss = [], isLoading: isLoadingTasks, error: errorTasks } = useGetTasksQuery(undefined);
    const [searchTasks, { data: tasks = [], isLoading: isLoadingSearchTasks, isError, error: errorSearchTasks }] = useLazyGetTaskByNameQuery();
    const [deleteTask, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteTaskMutation();
    const [updateTaskText, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateTaskTextMutation();

    const [editingTask, setEditingTask] = useState<ITask | null>(null);
    const route = useRouter();

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

    console.log(searchText);
    console.log(tasks);

    const handleSearchTask = async (text: string) => {
        setSearchText(text)
        searchTasks({ text: searchText });
    }

    useEffect(() => {
        searchTasks({ text: searchText });
        if (isDeleteSuccess || isUpdateSuccess) {
            console.log("Task successfully");
            searchTasks;
        } else {
            console.error("Failed to api");
        }
    }, [isDeleteSuccess, isUpdateSuccess]);

    if (isLoadingSearchTasks) return <div>Loading tasks...</div>;
    if (isError) return <div>Error loading tasks</div>;

    return (
        <>
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">TODO LISH APP</h1>
                {/* <AddTack /> */}
                <SearchBar onSearch={(text: string) => searchTasks({ text })} />
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
                        {Array.isArray(tasks) && tasks.length > 0 ? (
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
                                <td colSpan={3} className="text-center">
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TodoLish;
