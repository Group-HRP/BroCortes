import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Containerdefault } from "../../components/ContainerDefault";
import { Input } from "../../components/Input";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import type { LoginScreenNavigationProp } from "../../@types/navigation";

interface LoginScreenProps {
	navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const theme = useTheme();
	return (
		<Containerdefault alignItems="center" justifyContent="center">
			<Title fontSize="medium" fontFamily="bold">
				Acessar conta
			</Title>
			<Input
				placeholder="Email"
				padding={12}
				borderRadius={8}
				borderSize={1}
				fontFamily="regular"
				marginTop={32}
				marginBottom={6}
			/>
			<Input
				placeholder="Senha"
				secureTextEntry={true}
				padding={12}
				borderRadius={8}
				borderSize={1}
				fontFamily="regular"
				marginTop={6}
				marginBottom={6}
			/>
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					width: "100%",
				}}
			>
				<Button>
					<ButtonText color="text">Esqueceu a senha?</ButtonText>
				</Button>
			</View>
			<Button
				backgroundColor="primary"
				marginVertical={24}
				width={186}
				paddingHorizontal={24}
				paddingVertical={12}
				borderRadius={18}
			>
				<ButtonText fontSize="regular" weight="semibold" color="background">
					Entrar
				</ButtonText>
			</Button>
			<View style={{ flexDirection: "row", marginTop: 40 }}>
				<Text padding={5}>Nao possui conta?</Text>
				<Button onPress={() => navigation.navigate("Register")}>
					<ButtonText color="primary200">Criar conta</ButtonText>
				</Button>
			</View>
		</Containerdefault>
	);
}
