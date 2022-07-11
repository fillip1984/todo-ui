import { BsTrash } from "react-icons/bs";
import PropTypes from "prop-types";

const TodoItem = ({
  todo,
  toggleComplete,
  handleUpdate,
  handleSave,
  handleDelete,
}) => {
  return (
    <li className="flex items-center w-full gap-2 p-2 hover:bg-slate-200">
      <input
        type="checkbox"
        className="rounded-md"
        checked={todo.complete}
        onChange={() => toggleComplete(todo)}></input>
      {/* <textarea className="w-full" value={todo.name}></textarea> */}
      <input
        type="text"
        className={`${
          todo.complete ? "line-through" : ""
        } w-full bg-transparent`}
        onChange={(e) => handleUpdate(e, todo)}
        onBlur={() => handleSave(todo)}
        value={todo.description}></input>

      <div className="actions-container flex space-x-2 ml-auto">
        {/* <button type="button" onClick={() => handleUpdate(todo)}>
                  <BsPencil />
                </button> */}
        <button
          type="button"
          className="text-red-600"
          onClick={() => handleDelete(todo.id)}>
          <BsTrash />
        </button>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
