import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import {HeaderDefault, HeaderTitle} from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";

export default function AppointmentScreen() {
	const theme = useTheme();
	return (
		<ContainerDefault>
			<HeaderDefault>
				<HeaderTitle>Agendamentos</HeaderTitle>
			</HeaderDefault>

			<View style={{
				display: "flex",
				flexDirection:"column",
				justifyContent:'center',
				alignItems:'center',
				backgroundColor:theme.colors.background300,
				borderRadius:"8px",
				padding:40,
			}}>
				<Title fontSize="base" weight="bold">Nenhum agendamento</Title>
				<Text fontSize="regular" weight="normal">Os agendamentos apareceram aqui quando você reservar </Text>
			</View>
		</ContainerDefault>

	);
}
