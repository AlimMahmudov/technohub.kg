import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API}/store/`,
	});

	return baseQuery(args, api, extraOptions);
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryExtended,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	tagTypes: ["laptop", "contact", "about", "delivery","garantee"],
	endpoints: () => ({}),
});
