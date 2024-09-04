import { useState, useEffect } from 'react';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';


const Task = () => {
    const BackendURL = 'http://localhost:8000';

    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    const getTask = () => {
        axios.get(`${BackendURL}/Gettask`)
            .then((res) => {
                setTasks(res.data);
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    useEffect(() => {
        getTask();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTaskId) {
            handleUpdate(editingTaskId);
        } else {
            try {
                await axios.post(`${BackendURL}/create`, { name });
                toast.success('Task created successfully', {
                    position: "top-right"
                });
                getTask();
                setName('');
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BackendURL}/delete/${id}`);
            toast.success('Item Deleted Successfully', {
                position: "top-center",
            });
            getTask();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEditClick = (task) => {
        setName(task.name);
        setEditingTaskId(task._id);
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`${BackendURL}/update/${id}`, { name });
            toast.success('Item Updated Successfully', {
                position: "top-center"
            });
            getTask();
            setName('');
            setEditingTaskId(null); // Clear editing state after updating
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='task'>
            <h1>MANAGER</h1>
            <div className='task-details'>
                <p> Total Task: {tasks.length}</p>
                <p>Completed Tasks: 0</p>
            </div>
            {
                tasks.map((task) => {
                    return (
                        <div key={task._id} className='task-details single-task'>
                    
                            <p className='task-item'>{task.name}</p>
                            <p  className='task-items'>{task.createdAt}</p>
                            <div>
                                <FaRegEdit onClick={() => handleEditClick(task)} />
                                <FaRegTrashAlt onClick={() => handleDelete(task._id)} />
                            </div>
                        </div>
                    );
                })
            }
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Add or edit a task'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <button type="submit">
                    {editingTaskId ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
}

export default Task;
