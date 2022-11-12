import { FormEvent, KeyboardEvent, useReducer, useRef, useState } from "react";
import useTodoReducer, { TodoActionType } from "../../reducers/TodoReducer";
import { generateId, Todo } from "../../Types";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // input ref is used to set focus after adding a todo in case someone wants to add more than one and is using the Add button and not the enter key
  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const [newTodo, setNewTodo] = useState("");

  const [todos, todosDispatch] = useReducer(useTodoReducer, sampleTodos);

  /**
   * Handles shortcuts, when user hits enter and focus is inside of new todo field we add the todo. When user hits escape we clear out the text
   */
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    // onKeyPress wasn't capturing escape key

    // none of this is necessary if input is submit type and wrapped in form. Enter will trigger it already
    // if (e.key === "Enter") {
    //   //shortcut for adding todo
    //   handleAddTodo(newTodo);
    // } else if (e.key === "Escape") {

    if (e.key === "Escape") {
      //shortcut for clearing out todo input field
      setNewTodo("");
    }
  };

  //create
  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) {
      // nothing was entered into the field to add
      return;
    }

    todosDispatch({
      type: TodoActionType.AddTodo,
      payload: { id: generateId(), name: newTodo, complete: false },
    });

    // reset state of input and focus back on the new todo input
    setNewTodo("");
    if (newTodoInputRef.current != null) {
      newTodoInputRef.current.focus();
    }
  };

  return (
    <div className="flex h-full flex-col py-4">
      <div className="todos-container flex flex-col items-center gap-1 px-10">
        <h2>Todos</h2>
        <form onSubmit={handleCreate} className="flex w-full space-x-1">
          {/* Type is not search because while I do like that the Escape key clears the field, it also adds in autofill/autocomplete functionality that I'd rather not have */}
          <input
            type="text"
            className="w-full rounded-md"
            placeholder="Got something you need to do?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            autoFocus={true}
            onKeyUp={handleKeyUp}
            ref={newTodoInputRef}></input>
          <button
            type="submit"
            className="select-none rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300"
            disabled={newTodo ? false : true}>
            Add
          </button>
        </form>

        <ol className="todos-container w-full px-2">
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} todosDispatch={todosDispatch} />
          ))}
        </ol>
      </div>

      <div className="stats-container mt-auto flex flex-col items-center text-gray-500">
        <h3>Stats</h3>
        <span>Total: {todos?.length}</span>
        <span>Complete: {todos?.filter((todo) => todo.complete).length}</span>
      </div>
    </div>
  );
};

const sampleTodos: Todo[] = [
  {
    id: generateId(),
    name: "Do laundry",
    complete: false,
  },
  {
    id: generateId(),
    name: "Do disher",
    complete: false,
  },
  {
    id: generateId(),
    name: "Take out trash",
    complete: false,
  },
];

export default TodoList;
