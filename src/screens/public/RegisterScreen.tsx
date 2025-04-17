import { Button, ButtonText } from "../../components/Button";
import { Containerdefault, CustomContainer } from "../../components/Containers";
import { Input } from "../../components/Input";
import { Text, Title } from "../../components/Typography";

export default function RegisterScreen() {
	return (
		<Containerdefault justifyContent="center" alignItems="center">
			<CustomContainer padding={32} alignItems="center">
				<Title fontSize="h4" marginBottom={16}>
					Criar conta
				</Title>
				<Text marginTop={16} fontSize="md">
					Basta preencher os campos abaixo para criar sua conta!
				</Text>
			</CustomContainer>
			<CustomContainer width={"100%"} paddingHorizontal={32}>
				<CustomContainer marginVertical={8}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Nome
					</Text>
					<Input borderRadius={"md"} marginTop={8} />
				</CustomContainer>
				<CustomContainer marginVertical={8}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Email
					</Text>
					<Input borderRadius={"md"} marginTop={8} />
				</CustomContainer>
				<CustomContainer marginVertical={8}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Senha
					</Text>
					<Input borderRadius={"md"} marginTop={8} />
				</CustomContainer>
				<CustomContainer marginBottom={32} marginTop={8}>
					<Text fontSize="sm" fontWeight="bold" fontFamily="regular">
						Confirme sua senha
					</Text>
					<Input borderRadius={"md"} marginTop={8} />
				</CustomContainer>
				<Button
					backgroundColor="primary"
					paddingVertical={12}
					paddingHorizontal={24}
					borderRadius={"lg"}
				>
					<ButtonText color="background" weight="semiBold">Criar conta</ButtonText>
				</Button>
			</CustomContainer>	
		</Containerdefault>
	);
}
