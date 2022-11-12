import { Dispatch, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { TodoActionType, TodoReducerType } from "../../reducers/TodoReducer";
import { Todo } from "../../Types";

interface TodoItemProps {
  todo: Todo;
  todosDispatch: Dispatch<TodoReducerType>;
}

const TodoItem = ({ todo, todosDispatch }: TodoItemProps) => {
  const [name, setName] = useState(todo.name);

  return (
    <li className="flex w-full items-center gap-2 p-2 hover:bg-slate-200">
      <input
        type="checkbox"
        className="rounded-md"
        checked={todo.complete}
        onChange={() =>
          todosDispatch({ type: TodoActionType.ToggleTodo, payload: todo.id })
        }></input>
      <input
        type="text"
        className={`${
          todo.complete ? "line-through" : ""
        } w-full bg-transparent`}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) =>
          todosDispatch({
            type: TodoActionType.UpdateTodo,
            payload: { id: todo.id, name },
          })
        }
        value={name}></input>

      <div className="actions-container ml-auto flex space-x-2">
        <button
          type="button"
          className="text-red-600"
          onClick={() =>
            todosDispatch({ type: TodoActionType.RemoveTodo, payload: todo.id })
          }>
          <BsTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
