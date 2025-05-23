import { Alert, FlatList } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer, ContainerFooter } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import api from "../../services/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

interface CategoryType {
  id: number;
  category: string;
}

const category: CategoryType[] = [
  {
    id: 1,
    category: "Destaques",
  },
  {
    id: 2,
    category: "Cabelo",
  },
  {
    id: 3,
    category: "Barba",
  },
  {
    id: 4,
    category: "Tratamento capilar",
  },
];

export default function ServiceScreen() {
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState<
    { id: number; name: string; duration: string; price: string } | undefined
  >(undefined);

  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    category: string;
  }>();

  const [services, setServices] = useState(null);
  const { token } = useContext(AuthContext);

  const [messageError, setMessageError] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (category.length > 0 && !selectedCategory) {
      setSelectedCategory(category[0]);
    }

    const fetchServices = async () => {
      try {
        const response = await api.get("/service", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setServices(data.data);
      } catch (error) {
        console.log(error);
        setMessageError("Erro ao carregar os serviços");
      }
    };

    fetchServices();
  }, [category, selectedCategory]);

  const handleClickNextHours = () => {
	  if(selectedItem && selectedItem.id >= 1) {
		navigation.navigate("Hours");
	} else {
		Alert.alert("Serviço", "Selecione um serviço para continuar")
	}
  }

  return (
    <>
      <ContainerDefault>
        <Text>Seta</Text>
        <HeaderDefault paddingTop={40}>
          <HeaderTitle fontWeight="bold">Selecionar serviços</HeaderTitle>

          <FlatList
            data={category}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Button
                onPress={() => setSelectedCategory(item)}
                marginVertical={12}
                borderRadius={20}
                paddingHorizontal={16}
                paddingVertical={8}
                justifyContent="center"
                alignItems="baseline"
                backgroundColor={
                  selectedCategory === item ? "primary200" : "background"
                }
              >
                <Title fontSize="md" textAlign="center" marginBottom={6}>
                  {item.category}
                </Title>
              </Button>
            )}
          />
        </HeaderDefault>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button
              onPress={() =>
                setSelectedItem({
                  id: item.id,
                  name: item.name,
                  duration: item.duration.toString(),
                  price: item.price.toString(),
                })
              }
              marginTop={16}
              borderColor="background300"
              borderWidth={1}
              borderRadius={8}
              paddingHorizontal={24}
              paddingVertical={16}
              backgroundColor={
                selectedItem?.id === item.id ? "primary300" : "background"
              }
            >
              <CustomContainer
                flexDirection="row"
                alignItems="baseline"
                width={"100%"}
                justifyContent="space-between"
              >
                <Text fontSize="md">{item.name}</Text>
                <Text fontSize="sm" marginBottom={6}>
                  {item.duration} min
                </Text>
                <Text fontSize="xs">R$ {item.price}</Text>
              </CustomContainer>
            </Button>
          )}
        />
      </ContainerDefault>
      <View style={{ flex: 1, position: "relative" }}>
        <ContainerFooter
          position="absolute"
          backgroundColor="#404040"
          width={"100%"}
          height={96}
          borderRadius={20}
          zIndex={1}
          bottom={0}
          justifyContent="space-around"
          alignItems="center"
          flexDirection="row"
        >
          {selectedItem && selectedItem.id > 0 ? (
            <CustomContainer>
              <Text fontSize="sm" fontWeight="bold">
                R$
                {selectedItem.price}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {selectedItem.id.toString().length} serviços - 
                <Text fontSize="sm">{selectedItem.duration} min</Text>
              </Text>
            </CustomContainer>
          ) : (
            <CustomContainer>
              <Text fontSize="sm" fontWeight="bold">
                R$00.00
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                0 serviços - <Text fontSize="sm">00 min</Text>
              </Text>
            </CustomContainer>
          )}
          <Button
		  	onPress={handleClickNextHours}
            backgroundColor="primary"
            paddingHorizontal={24}
            paddingVertical={12}
            borderRadius={18}
          >
            <ButtonText color="background" weight="semiBold">
              Continuar
            </ButtonText>
          </Button>
        </ContainerFooter>
      </View>
    </>
  );
}
