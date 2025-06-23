import React, {
	createContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
	sub: number;
	name: string;
	email: string;
	role: string;
}

type AuthContextType = {
	user: User;
	token: string | null;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	login: (userData: any, token: string) => void;
	logout: () => void;
	isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [user, setUser] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadStorageData = async () => {
			try {
				const [storedUser, storedToken] = await Promise.all([
					AsyncStorage.getItem("@user"),
					AsyncStorage.getItem("@token"),
				]);

				if (storedUser && storedToken) {
					setUser(JSON.parse(storedUser));
					setToken(storedToken);
				}
			} catch (error) {
				console.error("Erro ao carregar dados:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadStorageData();
	}, []);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const login = async (userData: any, token: string | null) => {
		try {
			// Validação rigorosa dos dados de entrada
			if (!token || !userData) {
				console.error("Dados de login inválidos: Token ou userData faltando");
				throw new Error("Dados de login inválidos");
			}

			// Verifica se o token é uma string não vazia
			if (typeof token !== "string" || token.trim() === "") {
				console.error("Token inválido: deve ser uma string não vazia");
				throw new Error("Token inválido");
			}

			setUser(userData);
			setToken(token);

			await AsyncStorage.setItem("@user", JSON.stringify(userData));
			await AsyncStorage.setItem("@token", token);

			return true; // Indica sucesso
		} catch (error) {
			console.error("Falha no login:", error);
			// Limpa qualquer estado inconsistente
			setUser(null);
			setToken(null);
			await AsyncStorage.multiRemove(["@user", "@token"]);
			throw error; 
		}
	};

	const logout = async () => {
		setUser(null);
		setToken(null);
		await AsyncStorage.removeItem("@user");
		await AsyncStorage.removeItem("@token");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = React.useContext(AuthContext);
	return context;
}
