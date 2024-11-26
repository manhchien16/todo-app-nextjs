
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/slices/taskSlice';

const AddTack = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [taskValues, setTaskValues] = useState<string>('');
    const dispatch = useDispatch();

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (taskValues.trim()) {
            dispatch(addTask({ id: Date.now().toString(), text: taskValues }));
            setTaskValues("");
        }

    }

    return (
        <>
            <div>
                <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
                    Add new task
                    <AiOutlinePlus className='ml-2' size={18} />
                </button>

                <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    <form onSubmit={handleSubmitNewTodo}>
                        <h3 className='font-bold text-lg'>Add new task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskValues}
                                onChange={e => setTaskValues(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full" />
                            <button className='btn' type='submit'>Submit</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}
export default AddTack;