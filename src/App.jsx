import { QueryClient, QueryClientProvider } from "react-query";
import TodoList from "./components/todo/TodoList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </div>
  );
};

export default App;
