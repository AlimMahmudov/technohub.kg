import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getContact: build.query<CARDS.GetContactRes[], CARDS.GetContactReq>({
      query: () => ({
        url: `/contact/`,
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useGetContactQuery } = api;
