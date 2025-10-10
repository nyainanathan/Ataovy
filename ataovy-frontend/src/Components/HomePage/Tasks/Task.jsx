import { useEffect, useState } from "react";

const Task = ({ task, onChange }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'June' , 'July' , 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const [datee, setDatee] = useState('');
    const [editingMode, setEditingMode] = useState(false);
    const [taskDesc, setTaskDesc] = useState(task.description);
    const [taskDeadline, setTaskDeadline] = useState(task.deadline.substring(0,16))

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const getNextState = () => {
        if (task.status == 'NOT_STARTED') return 'IN_PROGRESS';
        else if (task.status == 'IN_PROGRESS') return 'DONE';
        else return 'ARCHIVED';
    }
    
    const getNextStateButton = () => {
        if(getNextState() == 'IN_PROGRESS') return 'START'
        else if(getNextState() == 'DONE') return 'FINISH'
        else return 'ARCHIVE'
    }

    const getPreviousState = () => {
        if (task.status == 'IN_PROGRESS') return 'NOT_STARTED'
        else return 'IN_PROGRESS'
    }

    const getFormattedDate = () => {    
        const date = task.deadline.substring(0,10).split('-').map(val => Number(val)).reverse();
        let formatedDate = months[date[1] - 1 ] + ' ' + date[0] + ', ' + date[2];
        console.log(formatedDate);
        setDatee('' + formatedDate)
        
    }

    const handleNextState = async () => {
        try{
            const editedTodo = { ...task, status: getNextState() };
            const editState = await fetch(`${API_URL}/todo/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(editedTodo)
            });
            if(editState.ok) {
                alert('To do edit succesfully');
                onChange && onChange();
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handlePreviousState = async () => {
        try{
            const editedTodo = { ...task, status: getPreviousState() };
            const editState = await fetch(`${API_URL}/todo/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(editedTodo)
            });
            if(editState.ok) {
                alert('To do edit succesfully');
                onChange && onChange();
            }
        } catch (e) {
            console.error(e);
        }
    }

    const confirmEdit = async () => {
        const editedTodo = { ...task, description: taskDesc, deadline: taskDeadline };
        try {
            const edit = await fetch(`${API_URL}/todo/`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(editedTodo)
            })
            if(edit.ok) {
                alert('To do edited succesfully');
                setEditingMode(false);
                onChange && onChange();
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleDeletion = async () => {
        
        try{
            const requestStatus = await fetch(`${API_URL}/todo/${task.id}`, {
                method: 'DELETE',
                headers : {
                    'Content-Type' : 'application/type'
                },
                credentials: 'include'
            });
            if(requestStatus.ok) {
                alert('Task Deleted');
                onChange()
            }
        } catch(e) {
            console.error(e);            
        }
    }

    useEffect(() => {
        getFormattedDate()
    } , [task])

    return (
        <div className="bg-amber-400 mt-1 mb-1 p-3 rounded-2xl flex flex-col">
            {
                !editingMode && 
                <>
                    <div className="flex items-center gap-3">

                        <i className="fa-solid fa-calendar-days"></i>

                        <p>{datee}</p>

                    </div>

                    <div className="flex justify-evenly">

                        <div className="flex justify-start">
                            {
                            task.status != 'NOT_STARTED' && 
                                <button
                                    onClick={handlePreviousState}
                                >
                                    <i className="fa-solid fa-circle-arrow-left text-2xl"></i>
                                </button>
                            }
                        </div>

                        <p className="p-2">
                            {task.description}
                        </p>

                    </div>
                
                    <div className="flex gap-2 m-auto">
                        <button className="bg-green-400 p-2 rounded-2xl"
                            onClick={handleNextState}
                        >
                            {
                                    getNextStateButton()
                            }
                        </button>
                        <button 
                        className="bg-blue-400 p-2 rounded-2xl"
                        onClick={() => setEditingMode(true)}
                        >EDIT</button>
                        <button
                        className="bg-red-400 rounded-2xl p-2"
                        onClick={handleDeletion}
                        >
                            DELETE
                        </button>
                    </div>
                </>
            }
            {
                editingMode && 
                    <div className="flex items-center gap-3 flex-col">

              
                        <div>
                            <i className="fa-solid fa-calendar-days"></i>
                            <label htmlFor="date"> New deadline</label>
                            <input type="datetime-local" name="date" id="date" 
                             value={taskDeadline}  onChange={(e) => setTaskDeadline(e.target.value)}
                            />
                        </div>
                        <div>
                            <i className="fa-solid fa-pen"></i>
                            <label htmlFor="description">New description</label>
                            <input type="text" name="description" id="description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
                        </div>
                        <div className="flex gap-5">
                            <button
                                onClick={confirmEdit}
                            >CONFIRM</button>
                            <button
                             onClick={()=> {setEditingMode(false)} }
                            >CANCEL</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Task