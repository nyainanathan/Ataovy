import { meta } from "@eslint/js";
import { useEffect, useMemo, useState } from "react";

const NewtodoForm = ({close, user, categories, onSuccess}) => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(new Date().toISOString().substring(0,16));
    const [isRecurring, setIsRecurring] = useState(false);
    const defaultCategoryId = useMemo(() => (categories && categories.length ? categories[0].id : undefined), [categories]);
    const [category, setCategory] = useState(defaultCategoryId);


    const validateForm = () => {
        if(!description){
            alert('Please fill out every field')
            return
        } 

        handleNewTodo();
    }

    const handleNewTodo = async () => {

        try{
            const newTodo = {
                description, deadline, isRecurring, 
                status: 'NOT_STARTED',
                userId: user,
                mainTodoId: null,
                categoryId: category
            }            
            // console.log(newTodo);
            const data = await fetch(`${API_URL}/todo/create-single`,{
                method: 'POST',
                headers: {
                    'Content-Type' :'application/json'
                },
                body: JSON.stringify(newTodo),
                credentials: 'include'
            })
            if(data.ok){
                alert('to do created succesfully');
                close();
                onSuccess && onSuccess();
            } else {
                alert('there was an error')
            }
            
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(()=> {
        console.log(deadline);
        
    }, [deadline])

    return (
        <div className="absolute bg-amber-100 left-[40%] top-[10%] w-1/4 px-6 py-3 rounded-2xl flex flex-col items-baseline justify-center gap-5">
            <p className="text-3xl">Create a new Todo!</p>
            <button 
            className=" absolute top-4 right-2 bg-red-400 rounded-2xl p-0.5"
            onClick={close}
            >
            <i className="fa-solid fa-xmark "></i>
            </button>
            <div className="flex w-[90%] ">
                <i className="text-2xl fa-solid mt-2 fa-align-left"></i>
                <div className="flex flex-col  p-2">
                    <label htmlFor="decription">Description</label>
                    <input type="text" 
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        className="outline-0 border-0 border-b pb-1" name="description" id="description"
                    />
                    
                </div>
            </div>
            <div className="flex w-[90%]">
                <i className="fa-solid fa-calendar-days text-2xl mt-2"></i>
                <div className="flex flex-col p-2">
                    <label htmlFor="duedate">Due date</label>
                    <input type="datetime-local" name="duedate" id="duedate" 
                    className="border-b pb-1" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex w-[90%]">
                <i className="fa-solid fa-clipboard-list text-2xl mt-2"></i>
                <div className="flex flex-col p-2">
                    <label htmlFor="categories">Categories</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} name="" id="" className="outline-0">
                        {
                            categories.map((el) => (
                                <option value={el.id} key={el.id} >{el.title}</option>
                            ))
                        }
                    </select>
                </div>
            </div>


            <div className="flex  w-[90%]">
                <i className="fa-solid fa-arrows-spin mt-2 text-2xl"></i>
                <div className="flex gap-3 p-2">
                    <label htmlFor="isRecurring">Recurring task</label>
                    <input value={isRecurring} onChange={(e) => setIsRecurring(!isRecurring)} type="checkbox" name="isRecurring" id="isRecurring" />
                </div>
            </div>

            <button
                className="bg-green-300 p-2 rounded w-[95%]"
                onClick={validateForm}
            >
                Create!
            </button>
        </div>
    )
}

export default NewtodoForm;