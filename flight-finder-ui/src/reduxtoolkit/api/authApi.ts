import { message } from "antd";
import { AuthUrl } from "../../config/api";
import { mainApi } from "./mainApi";

const Tags = Object.freeze({
  Auth: "Auth",
});
const createError = (error) => {
}

const flightApi = mainApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: params => ({
        url: AuthUrl.loginUrl,
        method: "POST",
        body: params,
      }),
      transformErrorResponse: (error) => {
        return error;
      },
      providesTags: [Tags.Auth],
    }),
  }),
});

export const { useLoginMutation } = flightApi;
