import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function AppointmentScreen() {
	const theme = useTheme();
	const navigation = useNavigation()

	return (
		<ContainerDefault>
			<HeaderDefault>
				<HeaderTitle>Agendamentos</HeaderTitle>
			</HeaderDefault>

			<View
				style={{
					display: "flex",
					marginTop: "88px",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: theme.colors.background300,
					borderRadius: "8px",
					padding: 40,
				}}
			>
				<Title fontSize="h6" weight="bold">
					Nenhum agendamento
				</Title>
				<Text fontSize="md" weight="normal" textAlign="center" marginTop={8}>
					Os agendamentos apareceram aqui quando você reservar{" "}
				</Text>
				<Button
					onPress={() => navigation.navigate('Service')}
					backgroundColor="primary"
					marginTop={24}
					width={186}
					paddingHorizontal={24}
					paddingVertical={12}
					borderRadius={18}
				>
					<ButtonText color="background" fontSize="md" weight="semiBold">
						Agendar Agora
					</ButtonText>
				</Button>
			</View>
		</ContainerDefault>
	);
}
