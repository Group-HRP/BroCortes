import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import { CustomContainer } from "../../components/Containers";
import { Loading } from "../../components/Loading";

import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";

export default function AppointmentScreen() {
	const theme = useTheme();
	const navigation = useNavigation();

	const { appointment, isLoading } = useContext(AppointmentContext)

	function formatarDataPersonalizada(dataISO) {
		const data = new Date(dataISO);

		const formatada = data.toLocaleDateString("pt-BR", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		});

		// Capitaliza a primeira letra de cada palavra
		return formatada
			.split(" ")
			.map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
			.join(" ")
			.replace(" De ", ", ")
			.replace(" De ", ", "); // Remove "de" e substitui por vírgulas
	}

	const isValidAppointment = (appointments) => {
		// Se não for array ou estiver vazio, inválido
		if (!Array.isArray(appointments)) return false;
		if (appointments.length === 0) return false;

		// Verifica cada item do array
		return appointments.every(item => {
			if (!item) return false; // Item é null/undefined

			// Verifica propriedades essenciais
			const hasValidService = !!item.service &&
				!!item.service.name &&
				item.service.price !== undefined;

			const hasValidDate = !!item.date;

			return hasValidService && hasValidDate;
		});
	};

	return (
		<ContainerDefault>
			<HeaderDefault marginBottom={56}>
				<HeaderTitle>Agendamentos</HeaderTitle>
			</HeaderDefault>
			{isLoading ? (
				<Loading />
			) : isValidAppointment(appointment) ? (
				<>
					<Title fontSize="h4">Em Andamento</Title>
					{appointment
						.map((item) => (
							<Button key={item.id} marginTop={32}>
								<CustomContainer
									backgroundColor={theme.colors.background300}
									borderRadius={8}
									paddingVertical={12}
									paddingHorizontal={24}
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
								>
									<CustomContainer>
										<Text fontSize="h6" fontWeight="medium">
											{item.service?.name ?? "Serviço não encontrado"}
										</Text>
										<Text fontSize="md" fontWeight="medium" marginTop={4}>
											{formatarDataPersonalizada(item.date)}
										</Text>
										<Text fontSize="md" fontWeight="medium">
											R$ {item.service?.price ?? "N/A"},00
										</Text>
									</CustomContainer>
									<ArrowRightIcon/>
								</CustomContainer>
							</Button>
						))}
						<CustomContainer marginTop={48} flexDirection="row" alignItems="center" justifyContent="space-between">
							<Text width={200}>Quer fazer um novo agendamento?</Text>
							<Button 
								onPress={() => navigation.navigate("Service")}
								backgroundColor="primary"
								width={186}
								paddingHorizontal={24}
								paddingVertical={12}
								borderRadius={18}
								alignItems="center" >
								<ButtonText color="background" fontSize="md" weight="medium">
									Agendar Agora
								</ButtonText>
							</Button>
						</CustomContainer>

					<Title fontSize="h4" marginTop={96}>Histórico</Title>
						<CustomContainer
							backgroundColor={theme.colors.background300}
							borderRadius={8}
							paddingVertical={12}
							paddingHorizontal={24}
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							marginTop={32}
						>
							<CustomContainer>
								<Text fontSize="h6" fontWeight="medium">
									slala
								</Text>
								<Text fontSize="md" fontWeight="medium" marginTop={4}>
									1556156
								</Text>
								<Text fontSize="md" fontWeight="medium">
									R$ 20,00
								</Text>
							</CustomContainer>
							<ArrowRightIcon/>
						</CustomContainer>
				</>
			) : (
				<View
					style={{
						display: "flex",
						marginTop: 88,
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.colors.background300,
						borderRadius: 8,
						padding: 40,
					}}
				>
					<Title fontSize="h6" weight="bold">Nenhum agendamento</Title>
					<Text
						fontSize="md"
						weight="normal"
						marginTop={16}
						style={{ width: 308, textAlign: "center" }}
					>
						Os agendamentos aparecerão aqui quando você reservar
					</Text>
					<Button
						onPress={() => navigation.navigate("Service")}
						backgroundColor="primary"
						marginTop={32}
						width={186}
						paddingHorizontal={24}
						paddingVertical={12}
						borderRadius={18}
						alignItems="center"
					>
						<ButtonText color="background" fontSize="md" weight="medium">
							Agendar Agora
						</ButtonText>
					</Button>
				</View>
			)}
		</ContainerDefault >
	);
}