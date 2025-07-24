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

    getDelivery: build.query<TEXT.GetDeliveryResponse, TEXT.GetDeliveryRequest>({
			query: () => ({
				url: `/store/delivery/`,
				method: "GET",
			}),
			providesTags: ["delivery"],
		}),

    getGarantee: build.query<TEXT.GetGaranteeResponse, TEXT.GetGaranteeRequest>({
			query: () => ({
				url: `/store/warranty/`,
				method: "GET",
			}),
			providesTags: ["garantee"],
		}),
	}),
});

export const { useGetAboutQuery, useGetDeliveryQuery, useGetGaranteeQuery } = api;
 