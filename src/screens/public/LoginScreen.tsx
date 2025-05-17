import { Alert, View } from "react-native";
import { Containerdefault } from "../../components/Containers";
import { Input } from "../../components/Input";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import type { LoginScreenNavigationProp } from "../../@types/navigation";
import { useState } from "react";
import api from "../../services/axios";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

interface LoginScreenProps {
	navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const { login } = useAuth();

	const [error, setError] = useState<string | null>(null);
	const [formLogin, setFormLogin] = useState({
		email: '',
		password: ''
	})

	const handleChange = (key: string, value: string): void => {
		setFormLogin({
			...formLogin,
			[key]: value,
		});
	};

	const menssageError = (message: string) => {
		setError(message);
		setTimeout(() => {
			setError("");
		}, 10000);
	};

	const handleSubmit = async () => {
		try {
			const response = await api.post("/auth/login", formLogin, {
				headers: {
					"Content-Type": "application/json",
				}
			})
			const {user, token} = response.data;	
			if (response.status !== 200) {
				menssageError("Erro ao fazer login");
				return;
			}

			login(user,token)

			navigation.navigate('Appointment')
		} catch (error) {
			Alert.alert("Erro", "Email ou senha incorretos");
			console.log(error);
		}
	}

	return (
		<Containerdefault alignItems="center" justifyContent="center">
			<Title fontSize="h4" fontWeight="bold">
				Acessar conta
			</Title>
			<Input
				value={formLogin.email}
				onChangeText={(text) => handleChange("email", text)}
				placeholder="Email ou telefone"
				padding={12}
				borderRadius={"md"}
				borderSize={1}
				fontFamily="regular"
				marginTop={56}
			/>
			<Input
				value={formLogin.password}
				onChangeText={(text) => handleChange("password", text)}
				placeholder="Senha"
				secureTextEntry={true}
				padding={12}
				borderRadius={"md"}
				borderSize={1}
				fontFamily="regular"
				marginTop={8}
				marginBottom={12}
			/>
			{error && (
				<Text
					fontSize="sm"
					fontWeight="bold"
					color="accent"
					marginTop={6}
					marginBottom={6}
				>
					{error}
				</Text>
			)}
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					width: "100%",
				}}
			>
				<Button>
					<ButtonText color="text" fontSize="sm" weight="medium">
						Esqueceu a senha?
					</ButtonText>
				</Button>
			</View>
			<Button
				onPress={handleSubmit}
				alignItems="center"
				backgroundColor="primary"
				marginTop={48}
				width={186}
				paddingHorizontal={24}
				paddingVertical={12}
				borderRadius={18}
			>
				<ButtonText
				disabled={formLogin.email === "" || formLogin.password === ""} 
				fontSize="md"
				weight="medium" 
				color="background">
					Entrar
				</ButtonText>
			</Button>
			<View style={{ flexDirection: "row", marginTop: 40 }}>
				<Text fontSize="md" fontWeight="regular">
					Nao possui conta?
				</Text>
				<Button onPress={() => navigation.navigate("Register")}>
					<ButtonText color="primary" weight="bold"> Criar conta</ButtonText>
				</Button>
			</View>
		</Containerdefault>
	);
}
