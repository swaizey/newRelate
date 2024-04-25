import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes:['Post', 'Users', 'Feedbacks'],
    endpoints: (build) => ({
      
    }),
  })