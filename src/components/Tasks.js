import Task from "./Task"

const Tasks = ({ taskprops, onDelete, onToggle }) => {

    return (

        <>
            {taskprops.map((task) => (<Task key={task._id} singletask={task} onDelete={onDelete} onToggle={onToggle} />))}
        </>
    )
}

export default Tasks