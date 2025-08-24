import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// fetchBaseQuery с авторизацией
const baseQueryWithAuth = fetchBaseQuery({
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

// fetchBaseQuery без авторизации (для skipAuth)
const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
});

const baseQueryExtended: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let modifiedArgs = args;

  // Проверяем, есть ли skipAuth в args и true ли оно
  if (typeof args === "object" && "skipAuth" in args && args.skipAuth) {
    // Удаляем skipAuth из args, чтобы fetchBaseQuery не увидел этот параметр
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skipAuth: _, ...rest } = args;
    modifiedArgs = rest;

    // Выполняем запрос без авторизации
    return baseQueryWithoutAuth(modifiedArgs, api, extraOptions);
  }

  // Если skipAuth нет, выполняем запрос с авторизацией
  return baseQueryWithAuth(modifiedArgs, api, extraOptions);
};

// Создаем API с использованием расширенного baseQuery
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  tagTypes: [
    "laptop",
    "contact",
    "about",
    "delivery",
    "garantee",
    "auth",
    "service",
    
  ],
  refetchOnFocus: true,
  refetchOnReconnect: false,
  endpoints: () => ({}), // endpoints будут добавляться через injectEndpoints
});
