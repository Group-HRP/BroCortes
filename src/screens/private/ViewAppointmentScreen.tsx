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

type ViewAppointmentRouteProp = RouteProp<AppStackParamList, "ViewAppointment">;

export default function ViewAppointmentScreen() {
  const theme = useTheme();

  const { params } = useRoute<ViewAppointmentRouteProp>();
  const { viewAppointment } = params;

  console.log("Params", viewAppointment);

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

    let parts = [];

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
      <HeaderDefault>
        <HeaderTitle>{viewAppointment.service?.name}</HeaderTitle>
      </HeaderDefault>
      <View style={{ marginTop: 35 }}>
        <Text style={{ fontSize: theme.fonts.sizes.h3, fontWeight: "bold" }}>
          {finalFormatted}
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 5 }}>
          {formattedDuration}
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.sizes.h4,
            fontWeight: "bold",
            marginTop: 35,
          }}
        >
          Visão Geral
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 5 }}>
          {viewAppointment.service?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 35,
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
            marginTop: 35,
            fontWeight: "bold",
          }}
        >
          Cancelamento
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 5 }}>
          Cancelar até{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            uma hora antes
          </Text>{" "}
          do período agendado{" "}
        </Text>
      </View>
    </ContainerDefault>
  );
}
