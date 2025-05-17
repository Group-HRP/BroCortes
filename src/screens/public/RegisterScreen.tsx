import { useState } from "react";
import { Button, ButtonText } from "../../components/Button";
import { Containerdefault, CustomContainer } from "../../components/Containers";
import { Input } from "../../components/Input";
import { Text, Title } from "../../components/Typography";
import { Alert } from "react-native";
import api from "../../services/axios";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
	const navigation = useNavigation();

	const [formRegister, setFormRegister] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [repPassword, setRepPassword] = useState("");
	const [error, setError] = useState("");

	const menssageError = (message: string) => {
		setError(message);
		setTimeout(() => {
			setError("");
		}, 10000);
	};

	const handleChange = (key: string, value: string): void => {
		setFormRegister({
			...formRegister,
			[key]: value,
		});
	};

	const handleSubmit = async () => {
		if (formRegister.password !== repPassword) {
			menssageError("As senhas não coincidem");
			return;
		}

		if (
			formRegister.name === "" ||
			formRegister.email === "" ||
			formRegister.password === ""
		) {
			menssageError("Preencha todos os campos");
			return;
		}

		if (formRegister.password.length < 8) {
			menssageError("A senha deve ter pelo menos 8 caracteres");
			return;
		}

		try {
			const data = {
				name: formRegister.name,
				email: formRegister.email,
				password: formRegister.password,
			};
			const response = await api.post("/auth/register", data, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});
			console.log(response.data);

			navigation.navigate("Login");
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			const msg =
				error.response?.data?.message ||
				"Erro ao criar conta, tente novamente mais tarde";
			Alert.alert("Erro", msg);
		}
	};

	return (
		<Containerdefault justifyContent="center" alignItems="center">
			<CustomContainer alignItems="center" paddingBottom={0} paddingHorizontal={32}>
				<Title fontSize="h4" marginBottom={32}>
					Criar conta
				</Title>
				<Text fontSize="md">
					Basta preencher os campos abaixo para criar sua conta!
				</Text>
			</CustomContainer>
			<CustomContainer width={"100%"} marginTop={24} paddingHorizontal={32} gap={24} alignItems="center">
				<CustomContainer width={"100%"}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Nome
					</Text>
					<Input
						value={formRegister.name}
						onChangeText={(text) => handleChange("name", text)}
						borderRadius={"md"}
						marginTop={8}
					/>
				</CustomContainer>
				<CustomContainer width={"100%"}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Email
					</Text>
					<Input
						value={formRegister.email}
						onChangeText={(text) => handleChange("email", text)}
						keyboardType="email-address"
						borderRadius={"md"}
						marginTop={8}
					/>
				</CustomContainer>
				<CustomContainer width={"100%"}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Senha
					</Text>
					<Input
						value={formRegister.password}
						onChangeText={(text) => handleChange("password", text)}
						secureTextEntry={true}
						borderRadius={"md"}
						marginTop={8}
					/>
				</CustomContainer>
				<CustomContainer width={"100%"}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Confirme sua senha
					</Text>
					<Input
						value={repPassword}
						onChangeText={(text) => setRepPassword(text)}
						secureTextEntry={true}
						borderRadius={"md"}
						marginTop={8}
					/>
					{error !== "" && (
						<Text fontSize="sm" color="accent" marginTop={8}>
							{error}
						</Text>
					)}
				</CustomContainer>
				<Button
					disabled={
						formRegister.name === "" ||
						formRegister.email === "" ||
						formRegister.password === "" ||
						repPassword === ""
					}
					onPress={handleSubmit}
					backgroundColor="primary"
					paddingVertical={12}
					paddingHorizontal={24}
					borderRadius={"lg"}
					marginTop={24}
					alignItems="center"
					width={186}
				>
					<ButtonText color="background" weight="bold">
						Criar conta
					</ButtonText>
				</Button>
			</CustomContainer>
		</Containerdefault>
	);
}
