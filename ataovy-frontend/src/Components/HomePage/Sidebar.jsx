const SideBar = () => {

    return (
        <div className="w-[15%] h-[95%] bg-blue-300 py-8 px-3 flex flex-col justify-between rounded-2xl">
            
            <div className="flex flex-col gap-5 text-[1.2rem]">
                <img src="/ataovy-logo-nobg.png"  alt="" />
                <div className="flex flex-col justify-center items-center gap-5"> 
                            <div className="flex items-center w-[70%] gap-2 cursor-pointer">
                                <i class="fa-solid fa-chart-line"></i> 
                                <p>
                                    Dashboard
                                </p>
                            </div> 
                            <div className="flex items-center  gap-2 w-7/10 cursor-pointer">
                                <i class="fa-solid fa-list-check"></i>
                                <p>
                                    Tasks
                                </p>
                            </div> 
                            <div className="flex items-center w-7/10 gap-2 cursor-pointer">
                                <i class="fa-solid fa-toolbox"></i>
                                <p>
                                Projects
                                </p>
                            </div> 
                        
                </div>
            </div>

            <div className="-50 flex flex-col gap-3 text-[1.2rem]">   
                <div className="flex p-3 justify-center items-center gap-2 cursor-pointer">
                    <i class="fa-solid fa-gear"></i>
                    <p>Settings</p>
                </div>
                <div className="flex p-3  justify-center items-center gap-2 cursor-pointer">
                <i class="fa-solid fa-person-walking-arrow-right"></i>
                <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar