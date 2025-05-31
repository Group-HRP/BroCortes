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
import { Loading } from "../../components/Loading";
import { AppointmentContext } from "../../context/AppointmentContext";

export default function ServiceScreen() {
	const navigation = useNavigation();

	const [selectedCategory, setSelectedCategory] = useState<{
		id: number;
		category: string;
	}>();

	const [category, setCategory] = useState();
	const { services, setServices, selectedItem, setSelectedItem } =
		useContext(AppointmentContext);
	const { token, logout } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [messageError, setMessageError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategory = async () => {
			setIsLoading(true);
			try {
				const response = await api.get("/category", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `bearer ${token}`,
					},
				});
				const data = response.data;

				setCategory(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategory();
	}, [token]);

	interface CategoryProp {
		id: number;
		name: string;
	}

	const handleClickCategoryList = (category: CategoryProp) => {
		setSelectedCategory({
			id: category.id,
			category: category.name,
		});
	};

	useEffect(() => {
		const fetchServicesByCategory = async () => {
			if (!selectedCategory) return;
			try {
				const response = await api.get(`/category/${selectedCategory.id}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const servicesData = response.data.service;
				setServices(servicesData);
			} catch (error) {
				console.log(error);
				setMessageError("Erro ao carregar os serviços");
			}
		};

		if (selectedCategory) {
			fetchServicesByCategory();
		}
	}, [selectedCategory, token, setServices]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await api.get("/service", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const servicesList =
					response.data.data ?? response.data.service ?? response.data;

				if (Array.isArray(servicesList)) {
					setServices(servicesList);
				} else {
					console.warn("Formato inesperado:", servicesList);
				}
			} catch (error) {
				console.log(error);
				setMessageError("Erro ao carregar os serviços");
			}
		};

		if (!selectedCategory) {
			fetchServices();
		}
	}, [token, setServices, selectedCategory]);

	const handleClickNextHours = () => {
		if (selectedItem && selectedItem.id >= 1) {
			navigation.navigate("Hours");
		} else {
			Alert.alert("Serviço", "Selecione um serviço para continuar");
		}
	};

	return (
		<>
			<ContainerDefault>
				<Button onPress={logout}>
					<Text>Seta</Text>
				</Button>
				<HeaderDefault paddingTop={40}>
					<HeaderTitle fontWeight="bold">Selecionar serviços</HeaderTitle>

					{isLoading ? (
						<Loading />
					) : (
						<FlatList
							data={category}
							keyExtractor={(item) => item.id.toString()}
							horizontal
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => (
								<Button
									onPress={() => handleClickCategoryList(item)}
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
										{item.name}
									</Title>
								</Button>
							)}
						/>
					)}
				</HeaderDefault>

				{isLoading ? (
					<Loading />
				) : (
					<FlatList
						data={services}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Button
								onPress={() => {
									if (setSelectedItem) {
										setSelectedItem({
											id: item.id,
											name: item.name,
											duration: item.duration.toString(),
											price: item.price.toString(),
										});
									}
								}}
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
				)}
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
						<>
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
						</>
					) : (
						<CustomContainer>
							<Text fontSize="lg" fontWeight="bold">
								Selecione um serviço
							</Text>
						</CustomContainer>
					)}
				</ContainerFooter>
			</View>
		</>
	);
}
function async() {
	throw new Error("Function not implemented.");
}
