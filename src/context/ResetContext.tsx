import React, { createContext, useState, ReactNode, useContext } from "react";
import api from "../services/axios";
import { showMessage } from "react-native-flash-message";

type ResetContextType = {
	email: string;
	isLoading: boolean;
	menssageError: string;
	sendEmail: boolean;
	handleSubmitSendCode: () => void;
	handleChange: (email: string) => void;
};

export const ResetContext = createContext<ResetContextType>(
	{} as ResetContextType,
);

export function ResetProvider({ children }: { children: ReactNode }) {
	const [email, setEmail] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [menssageError, setMenssageError] = useState<string>("");
	const [sendEmail, setSendEmail] = useState<boolean>(false);

	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleChange = (email: string) => {
		setEmail(email);
	};

	const handleSubmitSendCode = async () => {
		if (!validateEmail(email)) {
			setMenssageError("Digite um e-mail válido.");
			return;
		}

		try {
			setIsLoading(true);
			const response = await api.post("/password-reset/send", { email: email });

			if (response.status !== 201) {
				showMessage({
					message: "Erro ao enviar o código.",
				});
			} else {
				setSendEmail(true);
			}
			console.log("[response]", response.data, response.status);
		} catch (error) {
			console.log(error);
			showMessage({
				message: "Erro ao enviar o código.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ResetContext.Provider
			value={{
				email,
				isLoading,
				menssageError,
				sendEmail,
				handleChange,
				handleSubmitSendCode,
			}}
		>
			{children}
		</ResetContext.Provider>
	);
}

export function useReset() {
	const context = useContext(ResetContext);
	return context;
}
