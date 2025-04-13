import React, { createContext, useState, type ReactNode } from "react";

type AuthContextType = {
	user: any;
	login: () => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState(null);

	const login = () => {
		setUser({ id: 1, name: "Usuário" });
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = React.useContext(AuthContext);
	return context;
}
