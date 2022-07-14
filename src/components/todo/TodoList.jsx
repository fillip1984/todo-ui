import { todoStore } from "../../stores/TodoStore";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";

const TodoList = () => {
  //Use this guide to setup: https://create-react-app.dev/docs/adding-custom-environment-variables/
  const { REACT_APP_ADMIN_USERNAME: username } = process.env;
  const { REACT_APP_ADMIN_USERNAME: password } = process.env;

  const {
    data: todos,
    isError,
    isLoading,
    error,
    refetch,
  } = todoStore.useReadQuery();

  const loadSampleData = () => {
    console.log("loading sample data");
    fetch(`http://localhost:7878/todo/admin/load-sample-data`, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    }).finally(() => refetch());
  };

  return (
    <div className="flex flex-col h-full py-4">
      <div className="todos-container flex flex-col items-center gap-1 px-10">
        <h2>Todos</h2>
        <TodoCreate />

        <div className="loading-container">
          {isLoading && <span>Loading</span>}
        </div>

        <div className="error-container text-red-400">
          {isError && <span>Error occurred with message: {error}</span>}
        </div>

        <ol className="todos-container w-full px-2">
          {!isLoading &&
            todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
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
