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
import { ContainerFooter, CustomContainer } from "../../components/Containers";

import BackArrowIcon from "../../../assets/icons/BackArrowIcon";
import { AppStackParamList } from "../../routes/appStack";
import { CommonActions } from "@react-navigation/native";

export default function ReviewAppointment() {
  
  
  
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

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
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: "Tabs",
          state: {
            routes: [{ name: "Appointment" }],
          },
        },
      ],
    })
  );
  setIsLoading(false);
} else {
        console.error("Erro ao agendar:", response.data);
      }
    } catch (error) {
      console.error("Erro ao agendar:", error);
    }
  };

  return (
    <>
    <ContainerDefault>
      <HeaderDefault>
        <Button onPress={() => navigation.goBack()}>
						<BackArrowIcon/>
					</Button>
        <HeaderTitle marginTop={40} style={{ fontSize: theme.fonts.sizes.h4 }}>
          Revisar e confirmar
        </HeaderTitle>
      </HeaderDefault>
      <View style={{ marginTop: 35 }}>
        <View style={{gap:4}}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap:6 }}>
            <SchedulingIcon width={16} height={16} />
            <Text
              style={{
                fontSize: theme.fonts.sizes.sm,
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
              alignItems: "center",
              gap:6
            }}
          >
            <ClockProfileIcon width={16} height={16} />
            <Text style={{ fontSize: theme.fonts.sizes.sm }}>
              {" "}
              {resultado}
            </Text>
          </View>
        </View>


        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 32,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection:"column", gap: 4 }}>
            <Text style={{ fontSize: theme.fonts.sizes.sm, fontFamily:"medium" }}>
              {selectedItem?.name}
            </Text>
            <Text style={{ fontSize: theme.fonts.sizes.sm }}>
            {selectedItem?.duration}m
            </Text>
          </View>
          <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
            {`R$${selectedItem?.price},00`}
          </Text>
        </View>
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 32,
          }}
        >
          <Text style={{ fontSize: theme.fonts.sizes.md, fontWeight: "bold" }}>
            Preço total
          </Text>
          <Text style={{ fontSize: theme.fonts.sizes.md, fontWeight: "bold" }}>
            {`R$${totalPrice},00`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
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
            fontSize: theme.fonts.sizes.lg,
            marginTop: 32,
            fontWeight: "bold",
          }}
        >
          Método de pagamento
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 8,
            alignItems: "center",
          }}
        >
          <RelumeIcon width={18} height={18} />
          <Text
            style={{
              fontSize: theme.fonts.sizes.sm,
              marginLeft: 8,
            }}
          >
            Pagamento no local
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.fonts.sizes.md,
            marginTop: 32,
            fontWeight: "bold",
          }}
        >
          Notas
        </Text>
        <TextInput
          style={{
            height: 129,
            backgroundColor: theme.colors.background300,
            padding: 16,
            fontSize: theme.fonts.sizes.md,
            marginTop: 16,
            color: theme.colors.text,
            textAlignVertical: "top",
            borderRadius: 12,
          }}
          placeholder="Digite aqui suas observações"
          placeholderTextColor={theme.colors.placeholdertext}
          multiline={true}
        />
      </View>
    </ContainerDefault>
    <View style={{ flex: 1, position: "relative" }}>
      <ContainerFooter
                position="absolute"
                backgroundColor="#404040"
                width={"100%"}
                height={88}
                borderTopRightRadius={20}
                borderTopLeftRadius={20}
                zIndex={1}
                bottom={0}
                paddingHorizontal={20}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
          <CustomContainer>
            <Text
              style={{ fontSize: theme.fonts.sizes.sm, fontWeight: "bold" }}
            >
              {`R$${totalPrice},00`}
            </Text>
            <Text style={{ fontSize: theme.fonts.sizes.sm, fontWeight: 500 }}>
              {`${totalServices} serviço(s) - ${duracaoFormatada}`}
            </Text>
          </CustomContainer>
          <CustomContainer>
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
                  fontFamily: "medium",
                }}
              >
                Confirmar
              </ButtonText>
            </Button>
          </CustomContainer>
        </ContainerFooter>
        </View>
    </>
  );
}
