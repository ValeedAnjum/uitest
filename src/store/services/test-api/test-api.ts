import { baseApi } from "../baseApi";

// Test API endpoints for different data types
export const testApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<any, void>({
      query: () => ({
        url: "https://jsonplaceholder.typicode.com/users",
        method: "GET",
      }),
    }),
    fetchPosts: builder.query<any, void>({
      query: () => ({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
      }),
    }),
    fetchAlbums: builder.query<any, void>({
      query: () => ({
        url: "https://jsonplaceholder.typicode.com/albums",
        method: "GET",
      }),
      keepUnusedDataFor: 0, // Disable caching for this query
    }),
    fetchPhotos: builder.query<any, void>({
      query: () => ({
        url: "https://jsonplaceholder.typicode.com/photos?_limit=10",
        method: "GET",
      }),
    }),
    fetchTodos: builder.query<any, void>({
      query: () => ({
        url: "https://jsonplaceholder.typicode.com/todos?_limit=15",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchPostsQuery,
  useFetchAlbumsQuery,
  useFetchPhotosQuery,
  useFetchTodosQuery,
} = testApi;
