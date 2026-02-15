import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getPrinters: build.query<
      CARDS.GetPrinterResponse[],
      CARDS.GetPrinterRequest
    >({
      query: () => ({
        url: `/store/printer/`,
        method: "GET",
        skipAuth: true,
      }),
      providesTags: ["printers"],
    }),
    // postBasket: build.mutation<
    //   CARDS.PostPrinterBasketResponse,
    //   CARDS.PostPrinterBasketReq
    // >({
    //   query: (body) => ({
    //     url: `/store/printer_cart_items/`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["printers"],
    // }),
    // getBasket: build.query<CARDS.GetBasketRes[], CARDS.GetBasketReq>({
    //   query: () => ({
    //     url: "/store/printer_cart_items/",
    //     method: "GET",
    //   }),
    //   providesTags: ["printers"],
    // }),
  }),
});

export const { useGetPrintersQuery } = api;
