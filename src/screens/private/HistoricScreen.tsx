import { FlatList, View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loading } from "../../components/Loading";

export default function Historic() {
  const theme = useTheme();
  const { historicAppointment, isLoading } =
    useContext(AppointmentContext);

    console.log("historico de agendamentos: ", historicAppointment)

  function formataData(dataIso: string) {
    const data = new Date(dataIso);

    return format(data, "EEE, d MMM, yyyy", { locale: ptBR });
  }

  interface Service {
    name: string;
    price: number;
  }

  interface Appointment {
    id: string;
    service: Service;
    date: string;
  }

  const isValidAppointment = (
    appointments: Appointment[] | undefined
  ): boolean => {
    if (!Array.isArray(appointments)) return false;
    if (appointments.length === 0) return false;

    return appointments.every((item: Appointment | undefined) => {
      if (!item) return false;

      const hasValidService =
        !!item.service &&
        !!item.service.name &&
        item.service.price !== undefined;

      const hasValidDate = !!item.date;

      return hasValidService && hasValidDate;
    });
  };

  return (
    <ContainerDefault>
      <HeaderDefault>
        <HeaderTitle marginTop={40}>Histórico</HeaderTitle>
      </HeaderDefault>
      <View
        style={{
          marginTop: 56,
        }}
      >
        {isLoading ? (
          <Loading />
        ) : isValidAppointment(historicAppointment) ? (
          <FlatList
            data={historicAppointment}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CustomContainer
                backgroundColor={theme.colors.background300}
                paddingVertical={10}
                paddingHorizontal={16}
                marginVertical={8}
                borderRadius={8}
                flexDirection={"row"}
                alignItems="center"
                justifyContent="space-between"
              >
                <CustomContainer key={item.id}>
                  <Title fontSize="h6" marginBottom={4}>
                    {item.service?.name}
                  </Title>
                  <Text fontSize="md" fontFamily="medium">
                    {formataData(item.date)}
                  </Text>
                  <Text fontSize="md" fontFamily="medium">
                    {`R$${Number(item.service?.price).toFixed(2)}`}
                  </Text>
                </CustomContainer>
                <Button
                  backgroundColor="accent"
                  paddingHorizontal={20}
                  paddingVertical={12}
                  borderRadius={16}
                >
                  <ButtonText fontSize="md" fontFamily="medium" color="text">
                    Agendar Novamente
                  </ButtonText>
                </Button>
              </CustomContainer>
            )}
          />
        ) : (
          <View>
            <Text>Você não tem nenhum agendamento</Text>
          </View>
        )}
      </View>
    </ContainerDefault>
  );
}
