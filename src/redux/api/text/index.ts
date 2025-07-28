import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getAbout: build.query<TEXT.GetAboutResponse, TEXT.GetAboutRequest>({
      query: () => ({
        url: `/store/aboutus/`,
        method: "GET",
        skipAuth: true, 
      }),
      providesTags: ["about"],
    }),

    getDelivery: build.query<TEXT.GetDeliveryResponse, TEXT.GetDeliveryRequest>(
      {
        query: () => ({
          url: `/store/delivery/`,
          method: "GET",
          skipAuth: true, 
        }),
        providesTags: ["delivery"],
      }
    ),

    getGarantee: build.query<TEXT.GetGaranteeResponse, TEXT.GetGaranteeRequest>(
      {
        query: () => ({
          url: `/store/warranty/`,
          method: "GET",
          skipAuth: true, 
        }),
        providesTags: ["garantee"],
      }
    ),

    getService: build.query<TEXT.GetServiceResponse, TEXT.GetServiceResponsq>({
      query: () => ({
        url: `/store/service/`,
        method: "GET",
        skipAuth: true, 
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
