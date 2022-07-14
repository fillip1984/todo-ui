import PropTypes from "prop-types";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { todoStore } from "../../stores/TodoStore";

const TodoItem = ({ todo }) => {
  // had to 'denormalize' this value and use it in the ui so that it can be edited in place
  // then we use onBlur to make the actual update merging in this value into the todo that is sent to be updated
  const [todoDescription, setTodoDescription] = useState(todo.description);

  const [update] = todoStore.useUpdateMutation();
  const [del] = todoStore.useDeleteMutation();

  const toggleComplete = (todo) => {
    console.log("toggle complete");
    update({ ...todo, complete: !todo.complete });
  };

  const handleUpdate = (todo) => {
    console.log("update called");
    update({ ...todo, description: todoDescription });
  };

  const handleDelete = (id) => {
    console.log("delete called");
    del(id);
  };

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
        onChange={(e) => setTodoDescription(e.target.value)}
        onBlur={() => handleUpdate(todo)}
        value={todoDescription}></input>

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
};

export default TodoItem;
