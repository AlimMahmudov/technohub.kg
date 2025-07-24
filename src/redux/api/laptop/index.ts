import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getLaptop: build.query<CARDS.GetLaptopRes[], CARDS.GetLaptopReq>({
      query: () => ({
        url: `/store/laptop/`,
        method: "GET",
      }),
      providesTags: ["laptop"],
    }),
    detailLaptop: build.query<
      CARDS.GetLaptopDetailRes,
      CARDS.GetLaptopDetailReq
    >({
      query: (id) => ({
        url: `/store/laptop/${id}`,
        method: "GET",
      }),
      providesTags: ["laptop"],
    }),
  }),
});

export const { useGetLaptopQuery, useDetailLaptopQuery } = api;
