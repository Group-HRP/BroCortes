import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useTheme } from "styled-components/native";

import HeartProfileIcon from "../../../assets/icons/HeartProfileIcon";
import ClockProfileIcon from "../../../assets/icons/ClockProfileIcon";
import RightArrowProfileIcon from "../../../assets/icons/RightArrowProfileIcon";
import DoorProfileIcon from "../../../assets/icons/DoorProfileIcon";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const theme = useTheme();

  type RootParamList = {
    Historic: undefined;
  }

  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const { logout, user } = useContext(AuthContext);

  const userRole = user.role === "client" ? "Conta pessoal" : "Conta profissional";

  const HandleClickLogout = async () => {
	try {
	  await logout(); 
	} catch (error) {
	  console.error("Erro ao fazer logout:", error);
	}
  };

  return (
    <ContainerDefault>
      <HeaderDefault display="flex" flexDirection="row" paddingTop={44}>
        <CustomContainer display="flex" gap={4}>
          <HeaderTitle>{user.name}</HeaderTitle>
          <Text fontFamily="medium">{userRole}</Text>
        </CustomContainer>
        {/* Colocar imagem do perfil aqui */}
      </HeaderDefault>
      <CustomContainer
        marginTop={72}
        backgroundColor={theme.colors.background300}
        display="flex"
        flexDirection="column"
        borderRadius={19}
        paddingHorizontal={24}
      >
        <Button
          disabled={true}
          backgroundColor="background300"
          display="flex"
          flexDirection="row"
          width={"100%"}
          justifyContent="space-between"
          paddingVertical={24}
          alignItems="center"
        >
          <CustomContainer gap={12} flexDirection="row">
            <HeartProfileIcon />
            <ButtonText fontSize="lg" weight="medium">
              Favoritos
            </ButtonText>
          </CustomContainer>
          <RightArrowProfileIcon />
        </Button>
        <Button
          onPress={() => navigation.navigate("Historic")}
          backgroundColor="background300"
          display="flex"
          flexDirection="row"
          width={"100%"}
          justifyContent="space-between"
          paddingVertical={24}
          alignItems="center"
        >
          <CustomContainer gap={12} flexDirection="row">
            <ClockProfileIcon width={20} />
            <ButtonText fontSize="lg" weight="medium">
              Histórico de agendamentos
            </ButtonText>
          </CustomContainer>
          <RightArrowProfileIcon />
        </Button>
      </CustomContainer>

      <CustomContainer
        marginTop={42}
        backgroundColor={theme.colors.background300}
        display="flex"
        flexDirection="column"
        borderRadius={19}
        paddingHorizontal={24}
      >
        <Button
          onPress={HandleClickLogout}
          backgroundColor="background300"
          display="flex"
          flexDirection="row"
          width={"100%"}
          justifyContent="space-between"
          paddingVertical={24}
          alignItems="center"
        >
          <CustomContainer gap={12} flexDirection="row">
            <DoorProfileIcon />
            <ButtonText fontSize="lg" weight="medium">
              Sair
            </ButtonText>
          </CustomContainer>
          <RightArrowProfileIcon />
        </Button>
      </CustomContainer>
    </ContainerDefault>
  );
}
