import { useMutation, useQuery, useQueryClient } from "react-query";
import { loadSampleData, read } from "../../services/TodoService";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";
const TodoList = () => {
  //sourced from: https://github.com/Bassel17/laughing-computing-machine/blob/main/frontend/src/components/AddTodo.js
  const { isLoading, isError, data, error } = useQuery(["todos"], read);
  const queryClient = useQueryClient();
  const { mutate: loadSampleDataMutator } = useMutation(loadSampleData, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

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
            data?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </ol>
      </div>

      <div className="stats-container mt-auto flex flex-col items-center text-gray-500">
        <h3>Stats</h3>
        <span>Total: {data?.length}</span>
        <span>Complete: {data?.filter((todo) => todo.complete).length}</span>
        <button
          className="bg-orange-600 px-4 py-2 text-white rounded-md"
          onClick={loadSampleDataMutator}>
          Load Sample data
        </button>
      </div>
    </div>
  );
};

export default TodoList;
