import { useEffect, useState } from "react";

const Task = ({task}) => {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'June' , 'July' , 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const [datee, setDatee] = useState('');

    const getFormattedDate = () => {
        //console.log(task);
        
        const date = task.deadline.substring(0,10).split('-').map(val => Number(val)).reverse();
        let formatedDate = months[date[1] - 1 ] + ' ' + date[0] + ', ' + date[2];
        console.log(formatedDate);
        setDatee('' + formatedDate)
        
    }

    useEffect(() => {
        getFormattedDate()
    } , [task])

    return (
        <div className="bg-amber-200 mt-1 mb-1 p-3 rounded-2xl flex flex-col">
            <div
                className="flex items-center gap-3"
            ><i className="fa-solid fa-calendar-days"></i>
                <p>{datee}</p>
            </div>
            <p>{task.description}</p>
            <div className="flex gap-2 m-auto">
                <button className="bg-green-400 p-2 rounded-2xl">Done</button>
                <button className="bg-blue-400 p-2 rounded-2xl">Edit</button>
            </div>
        </div>
    )
}

export default Task