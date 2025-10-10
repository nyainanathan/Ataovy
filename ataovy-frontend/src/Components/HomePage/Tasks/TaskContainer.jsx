import Task from "./Task"

const TaskContainer = ({task = [], taskStatus = '', onChange}) => {
    return (
        <div className="overflow-y-scroll w-1/4 mr-1 bg-amber-200 rounded-2xl">
            <p className="">{taskStatus}</p>
            {
                task.filter(t => t.status == taskStatus).map((el) => (
                    <Task key={el.id || el.description + el.deadline} task={el} onChange={onChange} />
                )
                )
            }
        </div>
    )
}

export default TaskContainer