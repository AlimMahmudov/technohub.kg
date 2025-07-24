import { api as index } from "..";

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<AUTH.GetUserResponse, void>({
			query: () => ({
				url: "/accounts/user-me/",
				method: "GET",
			}),
			providesTags: ["auth"],
		}),

		registerUser: build.mutation<AUTH.RegisterResponse, AUTH.RegisterRequest>({
			query: (data) => ({
				url: "/accounts/register/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["auth"],
		}),

		loginUser: build.mutation<AUTH.LoginResponse, AUTH.LoginRequest>({
			query: (data) => ({
				url: "/accounts/login/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["auth"],
		}),

		loautUser: build.mutation<void, { refresh_token: string }>({
			query: (data) => ({
				url: "/accounts/logout/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["auth"],
		}),

		resertUser: build.mutation<void, { email: string }>({
			query: (data) => ({
				url: "/accounts/password_reset/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["auth"],
		}),
		confirmResetPassword: build.mutation<void, { token: string; password: string }>({
			query: (data) => ({
				url: "/accounts/password_reset/confirm/",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useLoautUserMutation,
	useResertUserMutation,
  useConfirmResetPasswordMutation
} = api;
