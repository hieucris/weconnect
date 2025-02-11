import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
    reducerPath: 'rootApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL
    }), 
    endpoints: (builder) => {
        return {
            register: builder.mutation({
                query: ({fullName, email, password}) => ({
                    url: '/signup',
                    method: 'POST',
                    body: {fullName, email, password}
                })
            })
        }
    },
})

export const { useRegisterMutation } = rootApi