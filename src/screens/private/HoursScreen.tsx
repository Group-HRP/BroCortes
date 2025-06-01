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

export function HoursScreen() {
  const {
    dataSelecionada,
    setDataSelecionada,
    horariosDisponiveis,
    horaSelecionada,
    setHoraSelecionada,
    isLoading,
  } = useContext(AppointmentContext);

  const handleDatePress = (date: { dateString: string }) => {
    setDataSelecionada(date.dateString);
  };

  return (
    <ContainerDefault>
      <HeaderDefault paddingTop={40} marginBottom={40}>
        <HeaderTitle>Selecionar horário</HeaderTitle>
      </HeaderDefault>
      <CustomContainer>
        <Calendar
          onDayPress={(day: { dateString: string }) => {
            handleDatePress(day);
            setHoraSelecionada("");
          }}
          markedDates={{
            [dataSelecionada]: {
              selected: true,
              marked: true,
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
            arrowColor: "#404040",
            monthTextColor: "#B8860B",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
        
        {isLoading ? (
          <>
            <Text fontSize="lg" fontWeight="semiBold" paddingVertical={12}>
              Horários disponíveis:
            </Text>
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
              <>
                <Text fontSize="lg" fontWeight="semiBold" paddingVertical={12}>
                  Horários disponíveis:
                </Text>
                <FlatList
                  data={horariosDisponiveis}
                  keyExtractor={(item) => item}
                  numColumns={4}
                  contentContainerStyle={""}
                  renderItem={({ item }) => (
                    <Button
                      onPress={() => setHoraSelecionada(item)}
                      marginHorizontal={8}
                      marginVertical={8}
                      backgroundColor={
                        horaSelecionada === item ? "primary" : "background200"
                      }
                      paddingHorizontal={24}
                      paddingVertical={12}
                    >
                      <ButtonText>{item}</ButtonText>
                    </Button>
                  )}
                />
              </>
            ) : (
              <CustomContainer
                alignItems="center"
                justifyContent="center"
                height={120}
                backgroundColor="#404040"
                borderRadius={20}
                marginVertical={24}
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
