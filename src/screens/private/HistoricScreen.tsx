import { View } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { useTheme } from "styled-components/native";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";

export default function Historic() {
  const theme = useTheme();
  const { historicalAppointments } = useContext(AppointmentContext);

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
        <CustomContainer
          backgroundColor={theme.colors.background300}
          paddingVertical={10}
          paddingHorizontal={16}
          borderRadius={8}
          flexDirection={"row"}
          alignItems="center"
          justifyContent="space-between"
        >
          {historicalAppointments?.map((appointment) => (
            <CustomContainer key={appointment.id}>
              <Title fontSize="h6" marginBottom={4}>
				{appointment.service?.name}
			  </Title>
              <Text fontSize="md" fontFamily="medium">
                Ter, 1 Abril, 2025
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
      </View>
    </ContainerDefault>
  );
}
