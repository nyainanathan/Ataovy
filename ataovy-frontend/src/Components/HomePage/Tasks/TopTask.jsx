import { useEffect, useState } from "react";

const TopTask = ({ tasks = [] }) => {
    const [todos, setTodos] = useState(tasks);
    const [topTodo, setTopTodo] = useState({});
    const [dueDate, setDueDate] = useState("")
    const [todostatus, setStatus] = useState("");
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'June' , 'July' , 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    

    const getTheTopTask = () => {
        let topTaskIndex = 0;    
        const dateArray = tasks.map(task => task.status=='DONE'? Infinity : new Date(task.deadline).getTime())    
        let min = dateArray[0];
        for(let i =0 ; i<dateArray.length; i++){
            if (dateArray[i] ==0) {
                continue
            } else if (min > dateArray[i]){
                min = dateArray[i];
                topTaskIndex = i;
            }
        }
        const theTask = tasks[topTaskIndex]
        setTopTodo(theTask);        
    };

    const getTopTaskFormattedDate = () => {
        if (!topTodo || !topTodo.deadline) return;
        console.log(topTodo.deadline);
        const date = topTodo.deadline.substring(0,10).split('-').map(val => Number(val)).reverse();
        let formatedDate = months[date[1] - 1 ] + ' ' + date[0] + ', ' + date[2];
        setDueDate(formatedDate);

        const remainingTimeInMilliSeconds = new Date(topTodo.deadline)  - new Date();
        // console.log(remainingTimeInMilliSeconds);
        const remainingTimeInMinutes = remainingTimeInMilliSeconds / (1000 * 60);
        const remainingTimeInHours = remainingTimeInMilliSeconds / (1000 * 60 * 60);
        const remainingTimeInDays = remainingTimeInMilliSeconds / (1000 * 60 * 60 * 24);
        console.log(remainingTimeInMinutes, remainingTimeInHours, remainingTimeInDays);
        if (remainingTimeInMilliSeconds < 0) {
            if(remainingTimeInDays > -1) {
                setStatus(`Late of ${remainingTimeInHours} hours`)
            } else {
                setStatus(`Late of ${Math.ceil(remainingTimeInDays * (-1))} days`)
            }
            
        } else {
            if(remainingTimeInDays < 1) {
                setStatus(`H-${Maths.ceil(remainingTimeInHours)}`)
            } else {
                setStatus(`J-${Math.ceil(remainingTimeInDays)}`)
            }
        }
    }

    useEffect(() => {
        getTheTopTask();
    }, [todos]);

    useEffect(() => {
        setTodos(tasks);
    }, [tasks]);

    useEffect(() => {
        if (topTodo && topTodo.deadline) {
            getTopTaskFormattedDate();
        }
    }, [topTodo]);

    if(!topTodo) {
        return (
            <p>Loading ...</p>
        )
    }

    return (
        <div className="w-full h-1/4 bg-amber-50  rounded-2xl flex flex-col gap-5">
            <div className="flex flex-col gap-3 bg-blue-400 rounded-t-2xl  py-2  px-6">
                <p>Closest deadline task</p>
                <p className="text-2xl">
                    {
                        topTodo.description
                    }
                </p>
            </div>
            <div className="flex gap-10  px-6">
                <div>
                    <p>Due date</p>
                    <p>{dueDate}</p>
                </div>

                <div>
                    <p>Status</p>
                    <p>{todostatus}</p>
                </div>
            </div>
        </div>
    );
};

export default TopTask;