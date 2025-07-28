import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getAbout: build.query<TEXT.GetAboutResponse, TEXT.GetAboutRequest>({
      query: () => ({
        url: `/store/aboutus/`,
        method: "GET",
      }),
      providesTags: ["about"],
    }),

    getDelivery: build.query<TEXT.GetDeliveryResponse, TEXT.GetDeliveryRequest>(
      {
        query: () => ({
          url: `/store/delivery/`,
          method: "GET",
        }),
        providesTags: ["delivery"],
      }
    ),

    getGarantee: build.query<TEXT.GetGaranteeResponse, TEXT.GetGaranteeRequest>(
      {
        query: () => ({
          url: `/store/warranty/`,
          method: "GET",
        }),
        providesTags: ["garantee"],
      }
    ),

    getService: build.query<TEXT.GetServiceResponse, TEXT.GetServiceResponsq>({
      query: () => ({
        url: `/store/service/`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useGetDeliveryQuery,
  useGetGaranteeQuery,
  useGetServiceQuery,
} = api;
