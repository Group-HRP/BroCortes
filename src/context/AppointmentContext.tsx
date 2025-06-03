import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import api from "../services/axios";
import { AuthContext } from "./AuthContext";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { is } from "date-fns/locale";

interface Service {
  id: number;
  name: string;
  price: string | number;
  duration: string | number;
  description: string;
}

export interface Appointment {
  id: number;
  serviceId: number;
  service?: Service;
  date: string;
  status: string;
  canceledAt: string | null;
  canceledById: number | null;
  cancellationReason?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

type AppointmentContextType = {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  selectedItem?: { id: number; name: string; duration: string; price: string };
  setSelectedItem?: React.Dispatch<
    React.SetStateAction<
      { id: number; name: string; duration: string; price: string } | undefined
    >
  >;
  dataSelecionada: string;
  setDataSelecionada: React.Dispatch<React.SetStateAction<string>>;
  horariosDisponiveis: string[];
  horaSelecionada: string;
  setHoraSelecionada: React.Dispatch<React.SetStateAction<string>>;
  appointment: Appointment[];
  setAppointment: React.Dispatch<React.SetStateAction<Appointment[]>>;
  isLoading: boolean;
};

export const AppointmentContext = createContext<AppointmentContextType>({
  services: [],
  setServices: () => {},
  selectedItem: undefined,
  setSelectedItem: () => {},
  dataSelecionada: "",
  setDataSelecionada: () => {},
  horariosDisponiveis: [],
  horaSelecionada: "",
  setHoraSelecionada: () => {},
  appointment: [],
  setAppointment: () => {},
  isLoading: false,
});

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user } = useContext(AuthContext);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedItem, setSelectedItem] = useState<
    { id: number; name: string; duration: string; price: string } | undefined
  >(undefined);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type RootStackParamList = {
    ConfirmAppointment: undefined;
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (horaSelecionada) {
      navigation.navigate("ConfirmAppointment");
    }
  }, [horaSelecionada, navigation]);

  useEffect(() => {
    const fetchHorariosDisponiveis = async () => {
      try {
        const response = await api.get("/working-hours/available-times", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { date: dataSelecionada, serviceId: selectedItem?.id },
        });

        const data = response.data;
        setHorariosDisponiveis(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
      }
    };

    if (dataSelecionada && selectedItem?.id) {
      setIsLoading(true);
      fetchHorariosDisponiveis();
    }
  }, [dataSelecionada, selectedItem, token]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/appointments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        setAppointment(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [token]);

  useEffect(() => {
    const fetchHistoricalAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/appointments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: user.sub,
          },
        });

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        setAppointment(data);
      } catch (error) {
        console.log("Erro ao listar historico", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalAppointments();
  }, [token, user.sub]);

  return (
    <AppointmentContext.Provider
      value={{
        services,
        setServices,
        selectedItem,
        setSelectedItem,
        dataSelecionada,
        setDataSelecionada,
        horariosDisponiveis,
        horaSelecionada,
        setHoraSelecionada,
        appointment,
        setAppointment,
        isLoading,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointment = () => useContext(AppointmentContext);
