import { useEffect, useState } from "react";

const Task = ({task}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'June' , 'July' , 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const [datee, setDatee] = useState('');

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
            const editedTodo = task;
            editedTodo.status = getNextState();
            const editState = await fetch(`${API_URL}/todo/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(editedTodo)
            });
            if(editState.ok) {
                alert('To do edit succesfully')
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getFormattedDate()
    } , [task])

    return (
        <div className="bg-amber-400 mt-1 mb-1 p-3 rounded-2xl flex flex-col">
            <div
                className="flex items-center gap-3"
            >
                <i className="fa-solid fa-calendar-days"></i>
                <p>{datee}</p>
           
            </div>
            <div className="flex justify-between">

            <p className="p-2">
                {task.description}
            </p>
            <div className="flex flex-col gap-2">
                {
                    task.status != 'NOT_STARTED' && (
                        <i className="fa-solid fa-circle-arrow-left text-2xl"></i>
                    )
                    
                }
                <i className="fa-solid fa-circle-arrow-right text-2xl"></i>
            </div>
            </div>
            <div className="flex gap-2 m-auto">
                <button className="bg-green-400 p-2 rounded-2xl"
                    onClick={handleNextState}
                >
                    {
                            getNextStateButton()
                    }
                </button>
                <button className="bg-blue-400 p-2 rounded-2xl">EDIT</button>
            </div>
        </div>
    )
}

export default Task