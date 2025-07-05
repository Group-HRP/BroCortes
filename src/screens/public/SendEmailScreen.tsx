import { Input } from "../../components/Input";
import  theme  from "../../theme";
import { Loading } from "../../components/Loading";
import { useReset } from "../../context/ResetContext";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../routes/authStack";
import { NavigationProp } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import BackArrowIcon  from "../../../assets/icons/BackArrowIcon";
import { Button, ButtonText } from "../../components/Button";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Text, Title } from "../../components/Typography";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";

export default function SendEmailScreen() {
  const {
    email,
    isLoading,
    menssageError,
    sendEmail,
    handleChange,
    handleSubmitSendCode,
  } = useReset();

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  if (sendEmail === true) {
    navigation.navigate("ValidateToken");

    showMessage({
      message: "Código enviado com sucesso!", 
    });
  }

  return (
    <ContainerDefault>
      <HeaderDefault>
        <Button onPress={() => navigation.goBack()}>
            <BackArrowIcon/>
        </Button>
      </HeaderDefault>
      <CustomContainer flex={1} justifyContent="center" alignItems="center" paddingHorizontal={32} width={"100%"}>
      <Title fontSize="h4" marginBottom={32}>
        Redefinição de senha
      </Title>
      <Text marginBottom={24}>
        Para redefinir sua senha, informe o email cadastrado na plataforma.
      </Text>
      <CustomContainer width={"100%"} paddingHorizontal={32}>
        <Input
          value={email}
          onChangeText={(text) => handleChange(text)}
          inputMode="email"
          placeholder="Digite o seu email"
          placeholderTextColor={theme.colors.background200}
          padding={12}
          borderRadius={"md"}
          borderSize={1}
          fontFamily="medium"
          width={"100%"}
        />
        <Text style={{ marginTop: 8, color: "red" }}>{menssageError}</Text>
      </CustomContainer>

        <Button onPress={handleSubmitSendCode}
          alignItems="center"
          backgroundColor="primary"
          width={186}
          paddingHorizontal={24}
          paddingVertical={12}
          borderRadius={18}
          >
            <ButtonText color="background" weight="medium" fontSize="md">
              {isLoading === true ? <Loading size={"small"} /> : "Enviar código"}
            </ButtonText>
        </Button>
      </CustomContainer>
    </ContainerDefault>

  );
}