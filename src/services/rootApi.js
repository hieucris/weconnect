import { logOut } from "@redux/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithForceLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logOut());
    window.location.href = "/login";
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithForceLogout,
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ fullName, email, password }) => ({
          url: "/signup",
          method: "POST",
          body: { fullName, email, password },
        }),
      }),
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: "/login",
          method: "POST",
          body: { email, password },
        }),
      }),
      verifyOTP: builder.mutation({
        query: ({ email, otp }) => ({
          url: "/verify-otp",
          method: "POST",
          body: { email, otp },
        }),
      }),
      authUser: builder.query({
        query: () => "/auth-user",
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useAuthUserQuery,
} = rootApi;
