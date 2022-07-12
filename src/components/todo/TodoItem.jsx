import PropTypes from "prop-types";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { del, update } from "../../services/TodoService";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();

  // had to 'denormalize' this value and use it in the ui so that it can be edited in place
  // then we use the onMutate function of the mutate object to normalize the value back into the object
  const [todoDescription, setTodoDescription] = useState(todo.description);

  const { mutate: handleSave } = useMutation(update, {
    onMutate: () => {
      todo.description = todoDescription;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const { mutate: handleDelete } = useMutation(del, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const toggleComplete = () => {
    console.log("toggling todo");
    // spread operator (...) is returning all existing values of the todo and then you can set anything you want to change, here we're only updating the complete indicator
    //see: https://javascript.plainenglish.io/how-to-easily-update-your-objects-with-the-spread-operator-8f3dfdbcf956
    todo.complete = !todo.complete;
    handleSave(todo);
  };

  return (
    <li className="flex items-center w-full gap-2 p-2 hover:bg-slate-200">
      <input
        type="checkbox"
        className="rounded-md"
        checked={todo.complete}
        onChange={() => toggleComplete()}></input>
      {/* <textarea className="w-full" value={todo.name}></textarea> */}
      <input
        type="text"
        className={`${
          todo.complete ? "line-through" : ""
        } w-full bg-transparent`}
        onChange={(e) => {
          setTodoDescription(e.target.value);
        }}
        onBlur={() => handleSave(todo)}
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
