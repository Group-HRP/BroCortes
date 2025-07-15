import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Text } from "../../components/Typography";
import { useTheme } from "styled-components/native";
import { Input } from "../../components/Input";
import { Button, ButtonText } from "../../components/Button";

export default function NewPasswordScreen() {
	const theme = useTheme();

	return (
		<ContainerDefault>
			<CustomContainer
				flex={1}
				alignItems="center"
				gap={24}
				justifyContent="center"
			>
				<Text fontSize="h4" fontFamily="bold" textAlign={"center"}>
					Redefina a sua senha
				</Text>
				<CustomContainer width={"100%"} marginTop={48}>
					<Text fontSize="md" fontFamily="bold">
						Nova senha:
					</Text>
					<Input
						maxLength={38}
						secureTextEntry={true}
						borderBottomWidth={1}
						borderColor="background300"
						backgroundColor="background"
						fontFamily="regular"
						borderRadius="md"
						fontSize="md"
					/>
				</CustomContainer>
				<CustomContainer width={"100%"}>
					<Text fontSize="md" fontFamily="bold">
						Confirme a senha:
					</Text>
					<Input
						maxLength={38}
						secureTextEntry={true}
						borderBottomWidth={1}
						borderColor="background300"
						backgroundColor="background"
						fontFamily="regular"
						borderRadius="md"
						fontSize="md"
					/>
				</CustomContainer>
				<Button
					marginTop={24}
					paddingHorizontal={24}
					paddingVertical={12}
					borderRadius={18}
					backgroundColor="primary"
				>
					<ButtonText color="background" fontFamily="medium">
						Confirmar alteração
					</ButtonText>
				</Button>
			</CustomContainer>
		</ContainerDefault>
	);
}
