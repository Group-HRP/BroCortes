import { View, TextInput, Dimensions } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import SchedulingIcon from "../../../assets/icons/SchedulingIcon";
import ClockProfileIcon from "../../../assets/icons/ClockProfileIcon";
import RelumeIcon from "../../../assets/icons/RelumeIcon";
import { useContext, useState } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import { addMinutes, format, parseISO } from "date-fns";
import { ptBR, se } from "date-fns/locale";
import api from "../../services/axios";
import { AuthContext } from "../../context/AuthContext";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

export default function AppointmentScreen() {
  type RootStackParamList = {
    Appointment: undefined;
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;

  const { horaSelecionada, dataSelecionada, selectedItem } =
    useContext(AppointmentContext);

  const { user, token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const dataFormatada = format(
    parseISO(dataSelecionada),
    "EEEE, dd 'de' MMMM",
    {
      locale: ptBR,
    }
  );

  const dataFinal =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  const [horas, minutos] = horaSelecionada.split(":").map(Number);
  const duracao = Number(selectedItem?.duration) || 0;

  const dataInical = new Date();

  dataInical.setHours(horas, minutos, 0, 0);

  // Adiciona a duração ao horário inicial
  const dateFinal = addMinutes(dataInical, duracao);

  // Formata as horas para o formato HH:mm
  const horaInicialFormatada = format(dataInical, "HH:mm");
  const horaFinalFormatada = format(dateFinal, "HH:mm");

  const Horas = Math.floor(duracao / 60);
  const minutosRestantes = duracao % 60;

  const duracaoFormatada =
    horas > 0
      ? `${Horas}hr${Horas > 1 ? "s" : ""}${
          minutosRestantes > 0 ? ` e ${minutosRestantes}min` : ""
        }`
      : `${minutosRestantes}min`;

  const resultado = `${horaInicialFormatada} - ${horaFinalFormatada} (${duracaoFormatada} de duração)`;

  const totalPrice = selectedItem?.price;

  const totalServices = 1;

  const dataISO = `${dataSelecionada}T${horaSelecionada}:00Z`;

  const handleClickAppointment = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(
        "/appointments",
        {
          userId: user.sub,
          serviceId: selectedItem?.id,
          date: dataISO,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigation.navigate("Appointment");
        setIsLoading(false);
      } else {
        console.error("Erro ao agendar:", response.data);
      }
    } catch (error) {
      console.error("Erro ao agendar:", error);
    }
  };

  return (
    <ContainerDefault>
      <HeaderDefault>
        <HeaderTitle style={{ fontSize: theme.fonts.sizes.h4 }}>
          Revisar e confirmar
        </HeaderTitle>
      </HeaderDefault>
      <View style={{ marginTop: 35 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <SchedulingIcon width={16} height={16} />
          <Text
            style={{
              fontSize: theme.fonts.sizes.xs,
              paddingVertical: 5,
              marginLeft: 5,
            }}
          >
            {"  "}
            {dataFinal}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <ClockProfileIcon width={16} height={16} />
          <Text style={{ fontSize: theme.fonts.sizes.xs, marginTop: 5 }}>
            {" "}
            {resultado}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 35,
          }}
        >
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
            {selectedItem?.name}
          </Text>
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
            {`R$${selectedItem?.price},00`}
          </Text>
        </View>
        <Text style={{ fontSize: theme.fonts.sizes.sm, marginTop: 5 }}>
          {selectedItem?.duration}m
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 35,
          }}
        >
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}>
            Preço total
          </Text>
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}>
            {`R$${totalPrice},00`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
            Pagamento apenas no local
          </Text>
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
            {`R$${totalPrice},00`}
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.fonts.sizes.md,
            marginTop: 35,
            fontWeight: "bold",
          }}
        >
          Método de pagamento
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <RelumeIcon width={18} height={18} />
          <Text
            style={{
              fontSize: theme.fonts.sizes.xs,
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            Pagamento no local
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.fonts.sizes.md,
            marginTop: 35,
            fontWeight: "bold",
          }}
        >
          Notas
        </Text>
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
        <View
          style={{
            margin: "auto",
            width: 420,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%", marginLeft: -25 }}>
            <Text
              style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}
            >
              {`R$${totalPrice},00`}
            </Text>
            <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
              {`${totalServices} serviço(s) - ${duracaoFormatada}`}
            </Text>
          </View>
          <View style={{ width: "60%" }}>
            <Button
              onPress={handleClickAppointment}
              style={{
                width: 240,
                height: 48,
                backgroundColor: theme.colors.primary,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 34,
              }}
            >
              <ButtonText
                style={{
                  fontSize: theme.fonts.sizes.md,
                  color: theme.colors.background,
                }}
              >
                Confirmar Agendamento
              </ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </ContainerDefault>
  );
}
