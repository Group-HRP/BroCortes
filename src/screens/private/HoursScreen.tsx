import { Calendar } from "react-native-calendars";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { Text } from "../../components/Typography";
import { useContext, useState } from "react";
import { FlatList } from "react-native";
import { Button, ButtonText } from "../../components/Button";
import "../../constants/LinguageCalendar";
import { AppointmentContext } from "../../context/AppointmentContext";
import { Loading } from "../../components/Loading";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

import BackArrowIcon from "../../../assets/icons/BackArrowIcon";

const today = new Date().toISOString().split("T")[0];

export function HoursScreen() {
  const {
    dataSelecionada,
    setDataSelecionada,
    horariosDisponiveis,
    horaSelecionada,
    setHoraSelecionada,
    isLoading,
  } = useContext(AppointmentContext);

  type RootStackParamList = {
    ReviewAppointment: undefined;
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  console.log("[data selecionada]", dataSelecionada);
  console.log("[horario disponiveis]", horariosDisponiveis);

  const handleDatePress = (date: { dateString: string }) => {
    setDataSelecionada(date.dateString);
  };

  if (horaSelecionada) {
    navigation.navigate("ReviewAppointment");
    return null;
  }

  return (
    <ContainerDefault>
      <HeaderDefault paddingTop={40}>
        <Button onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </Button>
        <HeaderTitle marginTop={40}>Selecionar horário</HeaderTitle>
      </HeaderDefault>
      <CustomContainer marginTop={64}>
        <Calendar
          hideExtraDays={false}
          minDate={today}
          onDayPress={(day: { dateString: string }) => {
            handleDatePress(day);
            setHoraSelecionada("");
          }}
          markedDates={{
            [dataSelecionada]: {
              selected: true,
              marked: false,
              selectedColor: "#B8860B",
            },
          }}
          theme={{
            backgroundColor: "#1A1A1A",
            calendarBackground: "#1A1A1A",
            textSectionTitleColor: "#E0E0E0",
            selectedDayBackgroundColor: "#4ade80",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#986B00",
            dayTextColor: "#E0E0E0",
            textDisabledColor: "#959aa2",
            arrowColor: "#B8860B",
            monthTextColor: "#ffffff",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
        />

        {isLoading ? (
          <>
            <CustomContainer
              alignItems="center"
              justifyContent="center"
              height={120}
            >
              <Loading />
            </CustomContainer>
          </>
        ) : (
          <>
            {dataSelecionada ? (
              horariosDisponiveis.length > 0 ? (
                <CustomContainer marginTop={40} gap={16}>
                  <FlatList
                    data={horariosDisponiveis}
                    keyExtractor={(item) => item}
                    numColumns={4}
                    renderItem={({ item }) => (
                      <Button
                        onPress={() => setHoraSelecionada(item)}
                        marginVertical={8}
                        width={"100%"}
                        backgroundColor={
                          horaSelecionada === item ? "primary" : "background"
                        }
                        paddingHorizontal={24}
                        paddingVertical={16}
                        borderWidth={1}
                        borderColor="background300"
                        borderRadius={16}
                      >
                        <ButtonText fontSize="md" fontFamily="medium">
                          {item}
                        </ButtonText>
                      </Button>
                    )}
                  />
                </CustomContainer>
              ) : (
                <CustomContainer
                  alignItems="center"
                  justifyContent="center"
                  height={120}
                  backgroundColor="#404040"
                  borderRadius={20}
                  marginTop={40}
                >
                  <Text color="accent300">Sem horários disponíveis</Text>
                </CustomContainer>
              )
            ) : (
              <CustomContainer
                alignItems="center"
                justifyContent="center"
                height={120}
                backgroundColor="#404040"
                borderRadius={20}
                marginTop={40}
              >
                <Text color="accent300">Selecione uma data no calendário</Text>
              </CustomContainer>
            )}
          </>
        )}
      </CustomContainer>
    </ContainerDefault>
  );
}
