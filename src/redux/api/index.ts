import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("access") : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const results = await baseQuery(args, api, extraOptions);
  return results;
};

export const api = createApi({
  baseQuery: baseQueryExtended,
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: false,
  tagTypes: [
    "laptop",
    "contact",
    "about",
    "delivery",
    "garantee",
    "auth",
    "service",
  ],
  endpoints: () => ({}),
});
