import React from "react";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import  { Text }  from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import  { useNavigation }  from "@react-navigation/native";

import BackArrowIcon from "../../../assets/icons/BackArrowIcon";
import { Input } from "../../components/Input";

export default function PersonalInfoScreen() {

const navigation = useNavigation();

  return (
    <ContainerDefault>
      <HeaderDefault marginBottom={88}>
        <Button onPress={() => navigation.goBack()}>
            <BackArrowIcon/>
        </Button>
      </HeaderDefault>

      <CustomContainer gap={24} alignItems="center">
        <Text marginBottom={50} fontSize="h4" fontFamily="bold">Informações pessoais</Text>
        <CustomContainer width={"100%"}>
          <Text fontSize="md" fontFamily="bold">Nome:</Text>
          <Input 
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md"/>
        </CustomContainer>
        <CustomContainer width={"100%"}>
          <Text fontSize="md" fontFamily="bold">Email:</Text>
          <Input 
          keyboardType="email-address"
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md"/>
        </CustomContainer>
        <CustomContainer position="relative" width={"100%"}>
          <Text fontSize="md" fontFamily="bold">Senha:</Text>
          <Input 
          maxLength={38}
          secureTextEntry={true}
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md"
          />
          <Button onPress={() => navigation.navigate("NewPassword")} position="absolute" right={2} bottom={16}>
            <ButtonText weight="medium" color="link">Alterar senha</ButtonText>
          </Button>
        </CustomContainer>
      </CustomContainer>
    </ContainerDefault>
  );
}
