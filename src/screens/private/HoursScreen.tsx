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
import type{ AppStackParamList } from "../../routes/appStack";

export function HoursScreen() {
  const {
    dataSelecionada,
    setDataSelecionada,
    horariosDisponiveis,
    horaSelecionada,
    setHoraSelecionada,
    isLoading,
    selectedItem,
  } = useContext(AppointmentContext);

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleDatePress = (date: { dateString: string }) => {
    setDataSelecionada(date.dateString);
  };

  const handleClickReviewAppointment = (hora: string) => {
	setHoraSelecionada(hora);

    if (horaSelecionada && dataSelecionada && selectedItem) {
      const appointmentData = {
        horaSelecionada,
        dataSelecionada,
        selectedItem,
      };
      navigation.navigate("ReviewAppointment", {
        appointment: appointmentData,
      });
    }
  };

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
                <CustomContainer marginTop={40} gap={16}>
                  <FlatList
                    data={horariosDisponiveis}
                    keyExtractor={(item) => item}
                    numColumns={4}
                    contentContainerStyle={""}
                    renderItem={({ item }) => (
                      <Button
                        onPress={() => handleClickReviewAppointment(item)}
                        marginVertical={8}
                        width={"100%"}
                        backgroundColor={
                          horaSelecionada === item ? "primary" : "background"
                        }
                        paddingHorizontal={24}
                        paddingVertical={16}
                        borderWidth={1}
                        borderColor="accent300"
                        borderRadius={16}
                      >
                        <ButtonText fontSize="md" fontFamily="medium">
                          {item}
                        </ButtonText>
                      </Button>
                    )}
                  />
                </CustomContainer>
              </>
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
