import { FlatList, View } from "react-native";
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

	const { appointment, historicAppointment, isLoading, fetchViewAppointment } = useContext(AppointmentContext)


	function formatarDataPersonalizada(dataISO) {
		const data = new Date(dataISO);

		const formatada = data.toLocaleDateString("pt-BR", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		});

		return formatada
			.split(" ")
			.map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
			.join(" ")
			.replace(" De ", ", ")
			.replace(" De ", ", ");
	}

	const isValidAppointment = (appointments) => {
		if (!Array.isArray(appointments)) return false;
		if (appointments.length === 0) return false;

		return appointments.every(item => {
			if (!item) return false;

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
					<FlatList
						data={appointment}
						showsVerticalScrollIndicator
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Button 
							key={item.id}
							onPress={() => fetchViewAppointment(item.id)}
							marginTop={15}>
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
									<ArrowRightIcon />
								</CustomContainer>
							</Button>
						)
						}
					/>
					<CustomContainer marginTop={28} flexDirection="row" alignItems="center" justifyContent="space-between">
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
					{historicAppointment.map((item) => (
						<Button 
						key={item.id}
						onPress={() => fetchViewAppointment(item.id)}>
							<CustomContainer
								backgroundColor={theme.colors.background300}
								borderRadius={8}
								paddingVertical={12}
								paddingHorizontal={24}
								flexDirection="row"
								justifyContent="space-between"
								alignItems="center"
								marginTop={32}
								marginBottom={32}
							>
								<CustomContainer>
									<Text fontSize="h6" fontWeight="medium">
										{item?.service.name}
									</Text>
									<Text fontSize="md" fontWeight="medium" marginTop={4}>
										{formatarDataPersonalizada(item.date)}
									</Text>
									<Text fontSize="md" fontWeight="medium">
										R${item?.service.price},00
									</Text>
								</CustomContainer>
								<ArrowRightIcon />
							</CustomContainer>
						</Button>
					))}
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