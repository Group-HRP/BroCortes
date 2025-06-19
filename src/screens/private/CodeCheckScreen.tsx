import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Text } from "../../components/Typography";
import { useTheme } from "styled-components/native";

export default function CodeCheckScreen() {
  const theme = useTheme();


  return (
    <ContainerDefault>
        <CustomContainer>
          <Text fontSize="h4" fontFamily="bold" textAlign={"center"}>Digite o código de 4 dígitos enviado em seu email</Text>
       </CustomContainer>
    </ContainerDefault>
  );
}
