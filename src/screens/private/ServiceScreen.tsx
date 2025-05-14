import { FlatList } from "react-native";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer, ContainerFooter } from "../../components/Containers";
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { Title, Text } from "../../components/Typography";
import { Button, ButtonText } from "../../components/Button";
import { useState, useEffect } from "react";
import { View } from "react-native";

const servicos = [
	{
		id: 1,
		nome: "Corte de Cabelo",
		tempo: "30 minutos",
		preco: "R$ 35,00",
	},
	{
		id: 2,
		nome: "Barba",
		tempo: "20 minutos",
		preco: "R$ 25,00",
	},
];

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
	const [selectedItem, setSelectedItem] = useState<
		{ id: number; nome: string; tempo: string; preco: string } | undefined
	>(undefined);

	const [selectedCategory, setSelectedCategory] = useState<{
		id: number;
		category: string; 
	}>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (category.length > 0 && !selectedCategory) {
      setSelectedCategory(category[0]);
    }
  }, [category]);
  

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
					data={servicos}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<Button
							onPress={() => setSelectedItem(item)}
							marginTop={16}
							borderColor="background300"
							borderWidth={1}
							borderRadius={8}
							paddingHorizontal={24}
							paddingVertical={16}
							backgroundColor={
								selectedItem === item ? "primary300" : "background"
							}
						>
							<CustomContainer
								flexDirection="row"
								alignItems="baseline"
								width={"100%"}
								justifyContent="space-between"
							>
								<Text fontSize="md">{item.nome}</Text>
								<Text fontSize="sm" marginBottom={6}>
									{item.tempo}
								</Text>
								<Text fontSize="xs">R$ {item.preco}</Text>
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
					<CustomContainer>
						<Text fontSize="sm" fontWeight="bold">
							R$00.00
						</Text>
						<Text fontSize="sm" fontWeight="medium">
							Qtd servico - <Text fontSize="sm">Tempo</Text>
						</Text>
					</CustomContainer>
					<Button
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
