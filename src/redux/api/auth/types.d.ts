namespace AUTH {
	// Вход
	export interface LoginRequest {
		username: string;
		password: string;
	}

	export interface LoginResponse {
		access_token: string;
		refresh_token: string;
		access_token_expiration?: string;
	}

	// Регистрация
	export interface RegisterRequest {
		username: string;
		email: string;
		password: string;
	}

	// Типы для групп и прав доступа
	export interface Group {
		id: number;
		name: string;
	}

	export interface Permission {
		id: number;
		name: string;
		codename: string;
	}

	// Ответ при регистрации или получении пользователя
	export interface RegisterResponse {
		id: number;
		username: string;
		email: string;
		date_joined: string;
		first_name: string;
		last_name: string;
		is_active: boolean;
		is_staff: boolean;
		is_superuser: boolean;
		last_login: string | null;
		password: string;
		phone_number: string | null;
		groups: Group[];
		user_permissions: Permission[];
	}

	// Получение всех пользователей
	export type GetUserResponse = RegisterResponse[];
}
