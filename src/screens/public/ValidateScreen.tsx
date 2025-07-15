import { useRef, useState, useEffect } from "react";
import theme from "../../theme";
import api from "../../services/axios";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../routes/authStack";
import { NavigationProp } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useReset } from "../../context/ResetContext";
import { Button, ButtonText } from "../../components/Button";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Input } from "../../components/Input";
import { Text, Title } from "../../components/Typography";

export default function ValidateScreen() {
	const { handleSubmitSendCode } = useReset();

	const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
	const numberOfInputs = 5;
	const [code, setCode] = useState(new Array(numberOfInputs).fill(""));
	const inputsRef = useRef<Array<any>>([]);
	const [resendCode, setResendCode] = useState(false);
	const [timer, setTimer] = useState(300);

	const handleChange = (text: string, index: number) => {
		if (/^\d$/.test(text)) {
			const newCode = [...code];
			newCode[index] = text;
			setCode(newCode);

			if (index < numberOfInputs - 1) {
				inputsRef.current[index + 1].focus();
			}

			if (newCode.every((digit) => digit !== "")) {
				handleSubmitValidateCode(newCode.join(""));
			}
		} else if (text === "") {
			const newCode = [...code];
			newCode[index] = "";
			setCode(newCode);
		}
	};

	const handleKeyPress = ({ nativeEvent }: any, index: any) => {
		if (nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
			inputsRef.current[index - 1].focus();
		}
	};

	const handleSubmitValidateCode = async (finalCode: string) => {
		try {
			const response = await api.post("/password-reset/validate", {
				token: finalCode,
			});
			if (response.status === 201) {
				navigation.navigate("ResetPassword");

				showMessage({
					message: "Código validado com sucesso!",
				});
			} else {
				throw new Error("Código inválido");
			}
		} catch (error) {
			console.error("Erro ao validar o código:", error);
			showMessage({
				message: "Código inválido.",
			});
			setCode(new Array(numberOfInputs).fill(""));

			if (inputsRef.current[0]) {
				inputsRef.current[0].focus();
			}
		}
	};

	const handleSubmitResendCode = async () => {
		try {
			setResendCode(true);
			setTimer(300);
			await handleSubmitSendCode();

			showMessage({
				message: "Código reenviado com sucesso!",
			});
		} catch (error) {
			showMessage({
				message: "Erro ao reenviar o código.",
			});
		}
	};

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;

		if (resendCode && timer > 0) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}

		if (timer === 0) {
			setResendCode(false);
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [resendCode, timer]);

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<ContainerDefault justifyContent="center" alignItems="center" gap={56}>
			<Title fontSize="h5" textAlign="center">
				Digite o código de 4 dígitos enviado em seu email
			</Title>
			<CustomContainer flexDirection="row" justifyContent="center">
				{code.map((digit, index) => (
					<Input
						key={index}
						keyboardType="number-pad"
						maxLength={1}
						style={{
							width: 48,
							borderWidth: 1,
							backgroundColor: "transparent",
							borderRadius: theme.borders.radius.md,
							textAlign: "center",
							borderColor: theme.colors.text,
							marginHorizontal: 16,
							fontSize: theme.fonts.sizes.h5,
							fontWeight: 700,
						}}
						value={digit}
						onChangeText={(text) => handleChange(text, index)}
						onKeyPress={(e) => handleKeyPress(e, index)}
						ref={(el: any) => (inputsRef.current[index] = el)}
					/>
				))}
			</CustomContainer>
			<Button
				onPress={handleSubmitResendCode}
				disabled={resendCode === true ? true : false}
				marginTop={24}
			>
				<ButtonText color="primary" fontSize="md" weight="bold">
					Reenviar código
				</ButtonText>
			</Button>
			{resendCode === true && (
				<Text>
					Código enviado, Aguarde {formatTime(timer)} para reenviar novamente
				</Text>
			)}
		</ContainerDefault>
	);
}
