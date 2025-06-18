import React from "react";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import  { Text }  from "../../components/Typography";
import { Button } from "../../components/Button";
import  { useNavigation }  from "@react-navigation/native";

import BackArrowIcon from "../../../assets/icons/BackArrowIcon";
import { Input } from "../../components/Input";

export default function PersonalInfoScreen() {

const navigation = useNavigation();

  return (
    <ContainerDefault>
      <HeaderDefault marginBottom={56}>
        <Button onPress={() => navigation.goBack()}>
            <BackArrowIcon/>
        </Button>
      </HeaderDefault>

      <CustomContainer gap={24}>
        <CustomContainer>
          <Text fontSize="md" fontFamily="black">Nome:</Text>
          <Input 
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md"/>
        </CustomContainer>
        <CustomContainer>
          <Text fontSize="md" fontFamily="black">Email:</Text>
          <Input 
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md"/>
        </CustomContainer>
        <CustomContainer>
          <Text fontSize="md" pad fontFamily="black">Senha:</Text>
          <Input 
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md"/>
        </CustomContainer>
        <CustomContainer>
          <Text fontSize="md" fontFamily="black">Telefone:</Text>
          <Input 
          borderBottomWidth={1}
          borderColor="background300"
          backgroundColor="background"
          fontFamily="regular"
          borderRadius="md"
          fontSize="md">
          </Input>
        </CustomContainer>
      </CustomContainer>
    </ContainerDefault>
  );
}
