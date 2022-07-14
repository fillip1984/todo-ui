import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Use this guide to setup: https://create-react-app.dev/docs/adding-custom-environment-variables/
const { REACT_APP_API_ROOT_URL: url } = process.env;
const { REACT_APP_ADMIN_USERNAME: username } = process.env;
const { REACT_APP_ADMIN_USERNAME: password } = process.env;

export const todoStore = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/todos`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Basic " + btoa(username + ":" + password));
      return headers;
    },
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    create: builder.mutation({
      query(todo) {
        return {
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    read: builder.query({
      query: () => "",
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),
    update: builder.mutation({
      query(todo) {
        return {
          url: `/$todo.id`,
          method: "PUT",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    delete: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});
