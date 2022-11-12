import { Reducer } from "react";
import { generateId, Todo } from "../Types";

export enum TodoActionType {
  AddTodo,
  RemoveTodo,
  UpdateTodo,
  ToggleTodo,
}

export type TodoReducerType =
  | {
      type: TodoActionType.AddTodo;
      payload: Todo;
    }
  | {
      type: TodoActionType.RemoveTodo;
      payload: number;
    }
  | {
      type: TodoActionType.UpdateTodo;
      payload: { id: number; name: string };
    }
  | {
      type: TodoActionType.ToggleTodo;
      payload: number;
    };

const useTodoReducer: Reducer<Todo[], TodoReducerType> = (
  state: Todo[],
  action: TodoReducerType
) => {
  switch (action.type) {
    case TodoActionType.AddTodo:
      return [...state, { ...action.payload, id: generateId() }];
    case TodoActionType.RemoveTodo:
      return state.filter((todo) => todo.id !== action.payload);
    case TodoActionType.UpdateTodo:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        } else {
          return todo;
        }
      });
    case TodoActionType.ToggleTodo:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

export default useTodoReducer;
