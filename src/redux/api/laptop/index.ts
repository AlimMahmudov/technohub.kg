import { api as index } from "..";

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getLaptop: build.query<CARDS.GetLaptopRes[], CARDS.GetLaptopReq>({
			query: () => ({
				url: `/store/laptop/`,
				method: "GET",
				skipAuth: true, 
			}),
			providesTags: ["laptop"],
		}),
		detailLaptop: build.query<
			CARDS.GetLaptopDetailRes,
			CARDS.GetLaptopDetailReq
		>({
			query: (slug) => ({
				url: `/store/laptop/${slug}`,
				method: "GET",
				skipAuth: true, 
			}),
			providesTags: ["laptop"],
		}),

		// basket

		postBasket: build.mutation<CARDS.PostBasketRes, CARDS.PostBasketReq>({
      query: (body) => ({
        url: `/store/cart_items/`,
        method: "POST",
        body,
				
      }),
      invalidatesTags: ["laptop"],
    }),

		getBasket: build.query<CARDS.GetBasketRes[], void>({
			query: () => ({
				url: `/store/cart_items/`,
				method: "GET",
			}),
			providesTags: ["laptop"],
		}),

		deleteBasket: build.mutation<void, number>({
      query: (id) => ({
        url: `/store/cart_items/${id}/`,
        method: "DELETE",
				
      }),
      invalidatesTags: ["laptop"],
    }),

    updateQuantity: build.mutation({
      query: ({ id, quantity,product_id }) => ({
        url: `/store/cart_items/${id}/`,  
        method: "PUT",
        body: { quantity,product_id },
      }),
      invalidatesTags: ["laptop"],  
    }),
		
	}),
});

export const {
	useGetLaptopQuery,
	useDetailLaptopQuery,
	usePostBasketMutation,
	useGetBasketQuery,
	useDeleteBasketMutation,
  useUpdateQuantityMutation
} = api;
