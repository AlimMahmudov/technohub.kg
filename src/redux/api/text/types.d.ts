namespace TEXT {
	export type GetAboutResponse = {
		id: number;
		description: string;
	}[];
	export type GetAboutRequest = void;


	export type GetDeliveryResponse = {
		id: number;
		description: string;
	}[];
	export type GetDeliveryRequest = void;

	
	export type GetGaranteeResponse = {
		id: number;
		description: string;
	}[];
	export type GetGaranteeRequest = void;
}
