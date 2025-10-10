import { useEffect, useState } from "react";
import NewtodoForm from "./NewtodoForm";

const SearchBar = ({tasks = []  , userId = '', onChange} ) => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [categories, setCategories] = useState([]);
    const [availableCategoriesId, setAvailableCategoriesId] = useState([]);
    const [presentCategories, setPresentCategories] = useState([]);
    const [creationMode, setCreationMode] = useState(false);
    const [allCategories , setAllCategories] = useState([]);
    const closePopUp = () => setCreationMode(false);

    useEffect(() => {
        
        const fetchingCategories = async () => {
            try {
                const data = await fetch(`${API_URL}/category/?userId=${userId}` , {
                    method: 'GET',
                    credentials: 'include'
                });
                const categoriess = await data.json();
                setCategories(categoriess)
            } catch(e) {
                console.error(e);
            }
        }
        if(userId) fetchingCategories();
    }, [userId])

    useEffect(() => {
        const categoriesSet = new Set();
        for(const task of tasks) {
            categoriesSet.add(task.categoryId)
        }
        const cat = Array.from(categoriesSet);
        const temp = categories.filter(el => cat.includes(el.id));
        setPresentCategories(temp);
        setAvailableCategoriesId(cat);
    } , [categories, tasks])

    return (
        <div className="w-full bg-amber-50 flex ">
            <div className="w-1/2 p-3 flex gap-10 items-center">
                <p>{tasks.length} {tasks.length > 1 ? ' todos' : ' todo'}</p>
                <button
                className="bg-amber-300 p-2 rounded-4xl cursor-pointer"
                onClick={() => setCreationMode(true)}
                > 
                    + Add New
                </button>
            </div>
            <div className="w-1/2 p-3 flex gap-3 items-center justify-evenly">
                <div className="bg-amber-600 w-1/3 h-9/10 gap-2 flex items-center py-1 px-2 rounded-xl">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="searhbar" className="outline-0 border-0" id="searchbar" placeholder="Type to search ..." />
                </div>

                <div>
                    <i className="fa-solid fa-filter"></i>
                    <select name="" id="">

                        {
                            presentCategories.map((el, index) => (
                                <option value={el.id} key={el.id} >{el.title}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

           {
            creationMode &&  <NewtodoForm close={closePopUp} user={userId} categories={categories} onSuccess={onChange} />
           } 
        </div>
    )
}

export default SearchBar;