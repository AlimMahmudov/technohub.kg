import { api as index } from "..";
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAbout: build.query<TEXT.GetAboutResponse, TEXT.GetAboutRequest>({
			query: () => ({
				url: `aboutus/`,
				method: "GET",
			}),
			providesTags: ["about"],
		}),

    getDelivery: build.query<TEXT.GetDeliveryResponse, TEXT.GetDeliveryRequest>({
			query: () => ({
				url: `delivery/`,
				method: "GET",
			}),
			providesTags: ["delivery"],
		}),

    getGarantee: build.query<TEXT.GetGaranteeResponse, TEXT.GetGaranteeRequest>({
			query: () => ({
				url: `warranty/`,
				method: "GET",
			}),
			providesTags: ["garantee"],
		}),
	}),
});

export const { useGetAboutQuery, useGetDeliveryQuery, useGetGaranteeQuery } = api;
 