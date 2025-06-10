import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { type RouteProp, useRoute } from "@react-navigation/native";
import type { AppStackParamList } from "../../routes/appStack";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import BackArrowIcon from "../../../assets/icons/BackArrowIcon";

type ViewAppointmentRouteProp = RouteProp<AppStackParamList, "ViewAppointment">;

export default function ViewAppointmentScreen() {
  const theme = useTheme();

  const { params } = useRoute<ViewAppointmentRouteProp>();
  const { viewAppointment } = params;

  const dataISO = viewAppointment.date;
  const date = new Date(dataISO);

  const formattedDate = format(date, "EEEE. MMM, yyyy 'às' HH:mm '(aaaa)'", {
    locale: ptBR,
  });

  const hours = date.getHours();
  const period = hours < 12 ? 'manhã' : hours < 18 ? 'Tarde' : 'Noite';
  const finalFormatted = formattedDate.replace('(aaaa)', period);

  function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMunutes = minutes % 60;

     const parts = [];

    if(hours > 0) {
      parts.push(`${hours} hr`)
    }

    if(remainingMunutes > 0) {
      parts.push(`${remainingMunutes} min`)
    }

    return `${parts.join(' e ')} de duração`;
  }

  const duration = viewAppointment.service?.duration;
  const formattedDuration = formatDuration(typeof duration === "number" ? duration : 0);

  return (
    <ContainerDefault key={viewAppointment.id}>
      <HeaderDefault paddingTop={40}>
        <Button onPress={() => navigation.goBack()}>
          <BackArrowIcon/>
        </Button>
        <HeaderTitle marginTop={56}>{viewAppointment.service?.name}</HeaderTitle>
      </HeaderDefault>
      <View style={{ marginTop: 32 }}>
        {/*
        <Text style={{ fontSize: theme.fonts.sizes.h3, fontWeight: "bold" }}>
          {finalFormatted}*/}
        <Text fontFamily="bold" fontSize="h3">{finalFormatted}
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 8 }}>
          {formattedDuration}
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.sizes.h4,
            fontWeight: "bold",
            marginTop: 40,
          }}
        >
          Visão Geral
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 8 }}>
          {viewAppointment.service?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 40,
          }}
        >
          <Text style={{ fontSize: theme.fonts.sizes.lg }}>Preço total</Text>
          <Text style={{ fontSize: theme.fonts.sizes.lg }}>
            R${viewAppointment.service?.price},00
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.fonts.sizes.h4,
            fontWeight: "bold",
          }}
        >
          Cancelamento
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 8 }}>
          Cancelar até{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            uma hora antes
          </Text>{" "}
          do período agendado{" "}
        </Text>
      </View>
      <Button 
				alignItems="center"
        borderWidth={1}
        borderColor="text"
				marginTop={112}
				paddingHorizontal={24}
				paddingVertical={16}
				borderRadius={18}>
        <ButtonText 
          weight="medium"
					color="text"
          fontSize="lg">
            Cancelar agendamento
        </ButtonText>
      </Button>
    </ContainerDefault>
  );
}
