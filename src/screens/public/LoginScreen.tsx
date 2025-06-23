import { Alert, View } from "react-native";
import { Containerdefault } from "../../components/Containers";
import { CustomContainer } from "../../components/Containers";
import { Input } from "../../components/Input";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import type { LoginScreenNavigationProp } from "../../@types/navigation";
import { useState } from "react";
import api from "../../services/axios";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "styled-components/native";

import LogoBroCortes from "../../../assets/logo/LogoBroCortes";
import { Loading } from "../../components/Loading";

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { login } = useAuth();

  const theme = useTheme();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string): void => {
    setFormLogin({
      ...formLogin,
      [key]: value,
    });
  };

  const menssageError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 10000);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", formLogin);
      const { payload, access_token } = response.data;
      const token = access_token;
      const user = payload;

      if (response.status !== 201) {
        menssageError("Erro ao fazer login");
        return;
      }

      login(user, token);
    } catch (error) {
      Alert.alert("Erro", "Email ou senha incorretos");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Containerdefault alignItems="center" justifyContent="center">
      <View style={{ marginBottom: 64 }}>
        <LogoBroCortes width={172} height={70} />
      </View>
      <CustomContainer
        width={"100%"}
        paddingHorizontal={32}
        alignItems="center"
      >
        <Title fontSize="h4" fontFamily="bold">
          Acessar conta
        </Title>
        <Input
          value={formLogin.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Email ou telefone"
          placeholderTextColor={theme.colors.background200}
          padding={12}
          borderRadius={"md"}
          borderSize={1}
          fontFamily="medium"
          marginTop={40}
        />
        <Input
          value={formLogin.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Senha"
          placeholderTextColor={theme.colors.background200}
          secureTextEntry={true}
          padding={12}
          borderRadius={"md"}
          borderSize={1}
          fontFamily="medium"
          marginTop={8}
          marginBottom={4}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Button marginTop={12}>
            <ButtonText color="text" fontSize="sm" weight="medium">
              Esqueceu a senha?
            </ButtonText>
          </Button>

          {error && (
            <Text fontSize="sm" fontWeight="bold" color="accent" marginTop={12}>
              {error}
            </Text>
          )}
        </View>
        <Button
          onPress={handleSubmit}
          alignItems="center"
          backgroundColor="primary"
          marginTop={48}
          width={186}
          paddingHorizontal={24}
          paddingVertical={12}
          borderRadius={18}
        >
          <ButtonText
            disabled={formLogin.email === "" || formLogin.password === ""}
            fontSize="md"
            weight="medium"
            color="background"
          >
            {isLoading === false ? "Entrar" : <Loading size={"small"} />}
          </ButtonText>
        </Button>
        <View
          style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}
        >
          <Text fontSize="md" fontWeight="regular">
            Nao possui conta?
          </Text>
          <Button onPress={() => navigation.navigate("Register")}>
            <ButtonText color="primary" weight="medium" fontSize="md">
              {" "}
              Criar conta
            </ButtonText>
          </Button>
        </View>
      </CustomContainer>
    </Containerdefault>
  );
}
