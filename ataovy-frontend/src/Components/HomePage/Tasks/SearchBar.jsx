import { useEffect, useState } from "react";

const SearchBar = ({tasks = []  , userId = ''} ) => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [categories, setCategories] = useState([]);
    const [availableCategoriesId, setAvailableCategoriesId] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [presentCategories, setPresentCategories] = useState([])
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
        // console.log(categories);
        
        const categoriesSet = new Set();
        for(const task of tasks) {
            categoriesSet.add(task.categoryId)
        }
        const cat = Array.from(categoriesSet); 
        // console.log(cat);
        // console.log(categories);
        
        
        const temp = categories.filter(el => cat.includes(el.id))   
        console.log(temp);
           
        setPresentCategories(temp);
        
        setAvailableCategoriesId(cat);

    } , [categories])

    // useEffect(() => {
    //     console.log(availableCategories);
        
    // } , [availableCategoriesId])

    // useEffect(() => {
    //     if(tasks){
    //         console.log(tasks);
    //     }
    // } , [tasks]);

    return (
        <div className="w-full bg-amber-50 flex ">
            <div className="w-1/2 p-3 flex gap-10 items-center">
                <p>{tasks.length} {tasks.length > 1 ? ' todos' : ' todo'}</p>
                <button className="bg-amber-300 p-2 rounded-4xl cursor-pointer"> 
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
                                <option value={el.id}>{el.title}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;