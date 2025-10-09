import Task from "./Task"

const TaskContainer = ({task = [], taskStatus = ''}) => {
    return (
        <div className="overflow-y-scroll w-1/4 mr-1 bg-amber-200 rounded-2xl">
            <p className="">{taskStatus}</p>
            {
                task.filter(t => t.status == taskStatus).map((el, index) => (
                    <Task task={el} />
                )
                )
            }
        </div>
    )
}

export default TaskContainer