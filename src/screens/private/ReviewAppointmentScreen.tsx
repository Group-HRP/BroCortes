import { View, TextInput, Dimensions } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import SchedulingIcon from "../../../assets/icons/SchedulingIcon";
import ClockProfileIcon from "../../../assets/icons/ClockProfileIcon";
import RelumeIcon from "../../../assets/icons/RelumeIcon";

export default function AppointmentScreen() {
	const theme = useTheme();
	const screenWidth = Dimensions.get("window").width;
	return (
		<ContainerDefault>
			<HeaderDefault>
				<HeaderTitle style={{fontSize: theme.fonts.sizes.h4}}>Revisar e confirmar</HeaderTitle>
			</HeaderDefault>
			<View style={{ marginTop: 35}}>
				<View style={{display: 'flex', flexDirection: 'row'}}>
					<SchedulingIcon width={16} height={16}/>
					<Text style={{ fontSize: theme.fonts.sizes.xs}}>  Sexta-feira 4 de abril</Text>
				</View>
				<View style={{display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
					<ClockProfileIcon width={16} height={16}/> 
					<Text style={{ fontSize: theme.fonts.sizes.xs, marginTop: 5 }}> 10:00 - 11:15 (1hr e 15 min de duração)</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginTop: 35 }}>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>Degradê</Text>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500  }}>R$30,00</Text>
				</View>
				<Text style={{ fontSize: theme.fonts.sizes.sm, marginTop: 5 }}>1hr</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginTop: 35 }}>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>Sobrancelha</Text>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500  }}>R$15,00</Text>
				</View>
				<Text style={{ fontSize: theme.fonts.sizes.sm, marginTop: 5 }}>15m</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginTop: 35 }}>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}>Preço total</Text>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}>R$45,00</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginTop: 5 }}>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>Pagamento apenas no local</Text>
					<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500  }}>R$45,00</Text>
				</View>
				<Text style={{ fontSize: theme.fonts.sizes.md, marginTop: 35, fontWeight: "bold" }}>Método de pagamento</Text>
				<View style={{display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
					<RelumeIcon width={18} height={18}/> 
					<Text style={{ fontSize: theme.fonts.sizes.xs, marginTop: 5, marginLeft: 5 }}>Pagamento no local</Text>
				</View>
				<Text style={{ fontSize: theme.fonts.sizes.md, marginTop: 35, fontWeight: "bold" }}>Notas</Text>
				<TextInput
                    style={{
						height: 129,
						backgroundColor: theme.colors.background300,
                        padding: 10,
                        fontSize: theme.fonts.sizes.md,
                        marginTop: 10,
						color: theme.colors.text,
						textAlignVertical: "top", 
						borderRadius: 5,
                    }}
                    placeholder="Comentário ou dúvida sobre o agendamento"
                    placeholderTextColor={theme.colors.text}
					multiline={true}
                />
			</View>
			<View
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 3,
						height: 88,
						backgroundColor: theme.colors.background300,
						borderRadius: 15,
						marginTop: 10,
						padding: 10,
					}}
				>
					<View style={{ margin: "auto", width: 420, 						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between"}}>
						<View style={{width: "40%", marginLeft: -25}}>
							<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}>R$45,00</Text>
							<Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>2 serviços - 1hr e 15 mins</Text>
						</View>
						<View style={{width: "60%",}}>
							<Button style={{ width: 240, height: 48, backgroundColor: theme.colors.primary, borderRadius: 18, justifyContent: "center", alignItems: "center", marginLeft: 34 }}>
								<ButtonText style={{ fontSize: theme.fonts.sizes.md, color: theme.colors.background }}>Confirmar Agendamento</ButtonText>
							</Button>
						</View>
					</View>
				</View>

		</ContainerDefault>
	);
}
