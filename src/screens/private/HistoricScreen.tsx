import { View } from "react-native";
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
  const { appointment, isLoading } = useContext(AppointmentContext);

  function formataData(dataIso: string) {
    const data = new Date(dataIso);

    return format(data, "EEE, d MMM, yyyy", {locale: ptBR});
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

    const isValidAppointment = (appointments: Appointment[] | undefined): boolean => {
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
        ) : isValidAppointment(appointment) ? (
        <CustomContainer
          backgroundColor={theme.colors.background300}
          paddingVertical={10}
          paddingHorizontal={16}
          borderRadius={8}
          flexDirection={"row"}
          alignItems="center"
          justifyContent="space-between"
        >
          {appointment?.map((appointment) => (
            <CustomContainer key={appointment.id}>
              <Title fontSize="h6" marginBottom={4}>
				{appointment.service?.name}
			  </Title>
              <Text fontSize="md" fontFamily="medium">
                {formataData(appointment.date)}
              </Text>
              <Text fontSize="md" fontFamily="medium">
                {`R$${appointment.service?.price},00`}
              </Text>
            </CustomContainer>
          ))}
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
        ) : (
          <View>
            <Text>
              Voce nao tem nenhum agendamento
            </Text>
          </View>
        )}
      </View>
    </ContainerDefault>
  );
}
