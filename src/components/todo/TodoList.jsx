import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  //Use this guide to setup: https://create-react-app.dev/docs/adding-custom-environment-variables/
  const { REACT_APP_API_ROOT_URL: url } = process.env;
  const { REACT_APP_ADMIN_USERNAME: username } = process.env;
  const { REACT_APP_ADMIN_USERNAME: password } = process.env;
  // placeholder for rest api subject and useful for making crud functions generic reducing the number of things that have to change from component to component.
  // This should be whatever your subject is in: http://server:port/context-path/api/v1/<subject>
  const subject = "todos";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // input ref is used to set focus after adding a todo in case someone wants to add more than one and is using the Add button and not the enter key
  const newTodoInputRef = useRef(null);

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // initial fetch of todos
  useEffect(() => {
    handleRead();
  }, []);

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

  //create
  const handleCreate = (e) => {
    if (newTodo) {
      console.log(`Creating ${subject}`);
      e.preventDefault();
      fetch(`${url}/${subject}`, {
        method: "POST",
        body: JSON.stringify({
          description: newTodo,
          complete: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            const msg = `Exception occurred while creating ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
            console.log(msg);
            throw new Error(msg);
          }

          return response.json();
        })
        .then((data) => {
          setTodos([...todos, data]);
          setNewTodo("");
        })
        .catch((err) => {
          setError(
            `An error occurred while creating ${subject}. Error: ${err}`
          );
        })
        .finally(() => {
          setLoading(false);
          //focus back on the new todo input
          if (newTodoInputRef.current != null) {
            newTodoInputRef.current.focus();
          }
        });
    }
  };

  //read
  const handleRead = () => {
    console.log("Reading todos");
    fetch(`${url}/${subject}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
          console.log(msg);
          throw new Error(msg);
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        setError(`An error occurred while reading ${subject}. Error: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //update
  //update (only updates state client side, waiting until on blur to push to server)
  const handleUpdate = (e, updatedTodo) => {
    console.log("Updating todo");
    setTodos(
      todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          // spread operator (...) is returning all existing values of the todo and then you can set anything you want to change
          //see: https://javascript.plainenglish.io/how-to-easily-update-your-objects-with-the-spread-operator-8f3dfdbcf956

          return {
            ...updatedTodo,
            description: e.target.value,
          };
        }
        return todo;
      })
    );
  };

  // handleUpdate doesn't push changes over to the server as that would cause network calls for each letter pressed. Instead, waiting until user leaves the field to push the update to the server
  const handleSave = (updatedTodo) => {
    console.log("pushing update to server");
    fetch(`${url}/${subject}/${updatedTodo.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
          console.log(msg);
          throw new Error(msg);
        }
        return response.json();
      })
      .then((data) => {
        setTodos(
          todos.map((todo) => (todo.id === updatedTodo.id ? data : todo))
        );
      })
      .catch((err) => {
        setError(`An error occurred while reading ${subject}. Error: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleComplete = (updatedTodo) => {
    console.log("toggling todo");
    // spread operator (...) is returning all existing values of the todo and then you can set anything you want to change, here we're only updating the complete indicator
    //see: https://javascript.plainenglish.io/how-to-easily-update-your-objects-with-the-spread-operator-8f3dfdbcf956
    handleSave({ ...updatedTodo, complete: !updatedTodo.complete });
  };

  //delete
  const handleDelete = (id) => {
    console.log(`deleting ${subject} with id: ${id}`);
    fetch(`${url}/${subject}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
          console.log(msg);
          throw new Error(msg);
        }
        response.text();
      })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => {
        setError(`An error occurred while deleting ${subject}. Error: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadSampleData = () => {
    console.log("loading sample data");
    fetch(`http://localhost:7878/todo/admin/load-sample-data`, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    }).finally(() => handleRead());
  };

  return (
    <div className="flex flex-col h-full py-4">
      <div className="todos-container flex flex-col items-center gap-1 px-10">
        <h2>Todos</h2>
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
            disabled={newTodo ? false : true}>
            Add
          </button>
        </form>

        <div className="loading-container">
          {loading && <span>Loading</span>}
        </div>

        <div className="error-container text-red-400">
          {error && <span>Error occurred with message: {error}</span>}
        </div>

        <ol className="todos-container w-full px-2">
          {!loading &&
            todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleUpdate={handleUpdate}
                handleSave={handleSave}
                handleDelete={handleDelete}
              />
            ))}
        </ol>
      </div>

      <div className="stats-container mt-auto flex flex-col items-center text-gray-500">
        <h3>Stats</h3>
        <span>Total: {todos?.length}</span>
        <span>Complete: {todos?.filter((todo) => todo.complete).length}</span>
        <button
          className="bg-orange-600 px-4 py-2 text-white rounded-md"
          onClick={loadSampleData}>
          Load Sample data
        </button>
      </div>
    </div>
  );
};

export default TodoList;
