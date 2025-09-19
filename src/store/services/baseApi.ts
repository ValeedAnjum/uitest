import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GLOBAL_TAGS } from "./tags";

// Define the base URL for your API
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Add authentication token if available
      // You can uncomment and modify this when implementing auth:
      // const token = (getState() as RootState).auth.token
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`)
      // }
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: GLOBAL_TAGS,
  endpoints: () => ({}),
});
