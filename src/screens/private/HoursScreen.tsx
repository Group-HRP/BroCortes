import { Calendar } from "react-native-calendars";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { Text } from "../../components/Typography";
import { useState } from "react";
import { FlatList } from "react-native";
import { Button, ButtonText } from "../../components/Button";

import "../../constants/LinguageCalendar";

const horariosDisponiveis = [
	"09:00",
	"10:00",
	"11:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
];

export function HoursScreen() {
	const [dataSelecionada, setDataSelecionada] = useState("");
	const [horaSelecionada, setHoraSelecionada] = useState("");

	return (
		<ContainerDefault>
			<HeaderDefault paddingTop={40} marginBottom={40}>
				<HeaderTitle>Selecionar horário</HeaderTitle>
			</HeaderDefault>
			<CustomContainer>
				<Calendar
					onDayPress={(day: string) => {
						setDataSelecionada(day);
						setHoraSelecionada("");
					}}
					markedDates={{
						[dataSelecionada]: {
							selected: true,
							marked: true,
							selectedColor: "#B8860B",
						},
					}}
					theme={{
						backgroundColor: "#1A1A1A",
						calendarBackground: "#1A1A1A",
						textSectionTitleColor: "#E0E0E0",
						selectedDayBackgroundColor: "#4ade80",
						selectedDayTextColor: "#ffffff",
						todayTextColor: "#986B00",
						dayTextColor: "#E0E0E0",
						textDisabledColor: "#959aa2",
						arrowColor: "#404040",
						monthTextColor: "#B8860B",
						textDayFontWeight: "500",
						textMonthFontWeight: "bold",
						textDayFontSize: 16,
						textMonthFontSize: 18,
						textDayHeaderFontSize: 14,
					}}
				/>

				{dataSelecionada ? (
					<>
						<Text fontSize="lg" fontFamily="semiBold" paddingVertical={12}>
							Horários disponíveis:
						</Text>
						<FlatList
							data={horariosDisponiveis}
							keyExtractor={(item) => item}
							numColumns={3}
							contentContainerStyle={""}
							renderItem={({ item }) => (
								<Button
									onPress={() => setHoraSelecionada(item)}
									marginHorizontal={8}
									marginVertical={8}
									backgroundColor={
										horaSelecionada === item ? "primary" : "background200"
									}
									paddingHorizontal={24}
									paddingVertical={12}
								>
									<ButtonText>{item}</ButtonText>
								</Button>
							)}
						/>
					</>
				) : (
					<CustomContainer
						alignItems="center"
						justifyContent="center"
						height={120}
						backgroundColor="#404040"
						borderRadius={20}
						marginVertical={24}
					>
						<Text color="accent300">Selecione uma data no calendário</Text>
					</CustomContainer>
				)}
			</CustomContainer>
		</ContainerDefault>
	);
}
