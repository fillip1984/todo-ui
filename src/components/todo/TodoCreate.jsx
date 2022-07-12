import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { create } from "../../services/TodoService";

const TodoCreate = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(create, {
    onSuccess: () => {
      /* ux - reset newTodo field and focus on it so that user can add in
       *      repeated tasks if focus was lost (such as they tapped or
       *      clicked the Add button instead of hitting the enter key)
       */
      setNewTodo("");
      newTodoInputRef.current.focus();
      queryClient.invalidateQueries("todos");
    },
  });

  const handleCreate = (e) => {
    // prevent form submit default behavior, which is submitting and refreshing the page
    e.preventDefault();

    /* ux - prevent empty tasks from being added, trim and require at least 1
     *      character is present for new todo
     */
    if (newTodo?.trim().length === 0) {
      return;
    }

    const todo = {
      description: newTodo,
      complete: false,
    };
    mutate(todo);
  };

  // input ref is used to set focus after adding a todo in case someone wants to add more than one and is using the Add button and not the enter key
  const newTodoInputRef = useRef(null);
  const [newTodo, setNewTodo] = useState("");

  /**
   * Handles shortcuts, when user hits enter and focus is inside of new todo field we add the todo. When user hits escape we clear out the text
   */
  const handleKeyUp = (e) => {
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

  return (
    <form onSubmit={handleCreate} className="flex space-x-1 w-full">
      {/* Type is not search because while I do like that the Escape key clears the field, it also adds in autofill/autocomplete functionality that I'd rather not have */}
      <input
        type="text"
        className="rounded-md w-full"
        placeholder="Got something you need to do?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        autoFocus={true}
        onKeyUp={handleKeyUp}
        ref={newTodoInputRef}></input>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg select-none transition-all duration-300"
        disabled={newTodo && !isLoading ? false : true}>
        Add
        {isLoading && <span className="ml-2">Loading...</span>}
      </button>
    </form>
  );
};

export default TodoCreate;
