import { Containerdefault, CustomContainer } from "../../components/Containers";
import { Text, Title } from "../../components/Typography";

export default function RegisterScreen() {
	return (
		<Containerdefault justifyContent="center" alignItems="center">
			<CustomContainer padding={32} alignItems="center">
				<Title fontSize="sm" marginBottom={16}>
					Criar conta
				</Title>
				<Text marginTop={16}>
					Basta preencher os campos abaixo para criar sua conta!
				</Text>
			</CustomContainer>
		</Containerdefault>
	);
}
