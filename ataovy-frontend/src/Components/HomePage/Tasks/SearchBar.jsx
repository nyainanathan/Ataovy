import { useEffect } from "react";

const SearchBar = ({tasks = []}) => {

    useEffect(() => {
        if(tasks){
            console.log(tasks);
        }
    } , tasks)


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
                </div>
            </div>
        </div>
    )
}

export default SearchBar;