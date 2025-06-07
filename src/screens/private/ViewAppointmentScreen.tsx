import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { type RouteProp, useRoute } from '@react-navigation/native';
import type{ AppStackParamList } from '../../routes/appStack';

type ViewAppointmentRouteProp = RouteProp<AppStackParamList, 'ViewAppointment'>;

export default function ViewAppointmentScreen() {
  const theme = useTheme();

  const { params } = useRoute<ViewAppointmentRouteProp>();
  const { appointment } = params;

  return (
    <ContainerDefault>
      <HeaderDefault>
        <HeaderTitle>Degradê, sobrancelha</HeaderTitle>
      </HeaderDefault>
      <View style={{ marginTop: 35 }}>
        <Text style={{ fontSize: theme.fonts.sizes.h3, fontWeight: "bold" }}>
          Sexta. Abril, 2025 às 10:00 (Manhã)
        </Text>
        <Text style={{ fontSize: theme.fonts.sizes.lg, marginTop: 5 }}>
          1hr e 15 min de duração
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
          Degradê + Sobrancelha
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
          <Text style={{ fontSize: theme.fonts.sizes.lg }}>R$45,00</Text>
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
