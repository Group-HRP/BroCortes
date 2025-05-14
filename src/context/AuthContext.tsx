import React, { createContext, useState, useEffect, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	user: any;
	token: string | null;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	login: (userData: any, token: string) => void;
	logout: () => void;
	isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [user, setUser] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadStorageData = async () => {
			try {
				const storedUser = await AsyncStorage.getItem("@user");
				const storedToken = await AsyncStorage.getItem("@token");

				if (storedUser && storedToken) {
					setUser(JSON.parse(storedUser));
					setToken(storedToken);
				}
			} catch (error) {
				console.log("Erro ao carregar dados do AsyncStorage", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadStorageData();
	}, []);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const login = async (userData: any, token: string) => {
		setUser(userData);
		setToken(token);

		await AsyncStorage.setItem("@user", JSON.stringify(userData));
		await AsyncStorage.setItem("@token", token);
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
