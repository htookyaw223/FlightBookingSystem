import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";

// initialize an empty api service that we'll inject endpoints into later as needed
export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().persistedAuth.accessToken;
      // if (token) {
      //   headers.set("Authorization", token);
      // }
      return headers;
    },
  }),

  endpoints: () => ({}),
});
