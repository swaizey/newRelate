import { api } from "@/lib/api";

export const usersApiSlice = api.injectEndpoints({
    
    endpoints:(builder)=>({
        items:builder.query({
            query:(reqType)=>`${reqType}`,
            providesTags:['Post', 'Users', 'Feedbacks']
        }),
        item:builder.mutation({
            query:(id)=>({
                url:`userpending/${id}`
            }),
            invalidatesTags:['Items']
            
        
        }),
    })
})

export const {useItemsQuery, useItemMutation} = usersApiSlice