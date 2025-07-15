import { useState } from "react";
import { useReset } from "../../context/ResetContext";
import api from "../../services/axios";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { AuthStackParamList } from "../../routes/authStack";
import { Loading } from "../../components/Loading";
import { showMessage } from "react-native-flash-message";
import BackArrowIcon from "../../../assets/icons/BackArrowIcon";
import { Button, ButtonText } from "../../components/Button";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Input } from "../../components/Input";
import { Text } from "../../components/Typography";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";

export default function ResetPasswordScreen() {
	const { email } = useReset();
	const [password, setPassoword] = useState<string>("");
	const [repPassword, setRepPassoword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

	function comparePasswords(password: string, repPassword: string) {
		return password === repPassword;
	}

	function validatePassword(password: string) {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
		return regex.test(password);
	}

	const handleSumbitResetPassword = async () => {
		if (!validatePassword(password)) {
			setErrorMessage(
				"A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.",
			);
			return;
		}

		if (!comparePasswords(password, repPassword)) {
			setErrorMessage("As senhas não coincidem.");
			return;
		}

		setErrorMessage("");
		setIsLoading(true);
		try {
			const response = await api.post(
				"/password-reset/reset",
				{
					email: email,
					newPassword: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status === 201) {
				navigation.navigate("Login");

				showMessage({
					message: "Senha Atualizada com Sucesso!",
				});
			} else {
				showMessage({
					message: "Erro ao redefinir a senha. Tente novamente.",
				});
			}
		} catch (error) {
			console.error("[error]", error);
			showMessage({
				message: "Erro de conexão. Tente novamente mais tarde.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ContainerDefault>
			<HeaderDefault marginBottom={88}>
				<Button onPress={() => navigation.goBack()}>
					<BackArrowIcon />
				</Button>
			</HeaderDefault>
			<CustomContainer>
				<Text>Redefina a sua senha</Text>
			</CustomContainer>
			<CustomContainer>
				<Text>Nova senha:</Text>
				<Input
					onChangeText={(text) => setPassoword(text)}
					autoCapitalize="none"
					value={password}
					placeholder="Digite a nova senha"
					secureTextEntry={true}
					style={{ marginVertical: 16 }}
				/>

				<Text>Confirme a senha:</Text>
				<Input
					onChangeText={(text) => setRepPassoword(text)}
					autoCapitalize="none"
					value={repPassword}
					placeholder="Digite a nova senha"
					secureTextEntry={true}
					style={{ marginVertical: 16 }}
				/>

				{errorMessage !== "" && (
					<Text style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
						{errorMessage}
					</Text>
				)}
			</CustomContainer>
			<CustomContainer>
				<Button onPress={handleSumbitResetPassword}>
					<ButtonText>
						{isLoading ? <Loading size={"small"} /> : "Confirmar alteração"}
					</ButtonText>
				</Button>
			</CustomContainer>
		</ContainerDefault>
	);
}
