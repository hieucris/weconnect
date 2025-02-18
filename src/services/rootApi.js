import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
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
    };
  },
});

export const { useRegisterMutation, useLoginMutation, useVerifyOTPMutation } =
  rootApi;
