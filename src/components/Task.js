import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Task = ({ singletask, onDelete, onToggle }) => {
    return (
        <div className={`task ${singletask.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(singletask._id)}>
            <h3>{singletask.text} <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} onClick={() => onDelete(singletask._id)} /></h3>
            <p>{singletask.day}</p>
        </div >
    )
}

export default Task