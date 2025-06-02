import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";

export default function Historic() {
	const theme = useTheme();
	return (
		<ContainerDefault>
			<HeaderDefault>
				<HeaderTitle>Histórico</HeaderTitle>
			</HeaderDefault>
			<View
				style={{
					marginTop: 56,
				}}
			>
				<CustomContainer
					backgroundColor={theme.colors.background300}
					paddingVertical={10}
					paddingHorizontal={16}
					borderRadius={8}
					flexDirection={"row"}
					alignItems="center"
					justifyContent="space-between"
				>
					<CustomContainer>
						<Title fontSize="h6" marginBottom={4}>
							Low Fade
						</Title>
						<Text fontSize="md" fontFamily="medium">
							Ter, 1 Abril, 2025
						</Text>
						<Text fontSize="md" fontFamily="medium">
							R$30,00
						</Text>
					</CustomContainer>
					<Button
						backgroundColor="accent"
						paddingHorizontal={20}
						paddingVertical={12}
						borderRadius={16}
					>
						<ButtonText fontSize="md" fontFamily="medium" color="text">
							Agendar Novamente
						</ButtonText>
					</Button>
				</CustomContainer>
			</View>
		</ContainerDefault>
	);
}
