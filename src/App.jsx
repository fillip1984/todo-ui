import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import TodoList from "./components/todo/TodoList";
import { todoStore } from "./stores/TodoStore";

const App = () => {
  return (
    <div className="App">
      <ApiProvider api={todoStore}>
        <TodoList />
      </ApiProvider>
    </div>
  );
};

export default App;
