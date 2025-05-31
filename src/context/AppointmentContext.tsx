import { useContext } from "react";
import { createContext, useState } from "react";

interface Service {
  id: number;
  name: string;
  price: string | number;
  duration: string | number;
  description: string;
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
};

export const AppointmentContext = createContext<AppointmentContextType>({
  services: [],
  setServices: () => {},
  selectedItem: undefined,
  setSelectedItem: () => {},
});

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedItem, setSelectedItem] = useState<
    { id: number; name: string; duration: string; price: string } | undefined
  >(undefined);

  return (
    <AppointmentContext.Provider value={{ services, setServices, selectedItem, setSelectedItem }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointment = () => useContext(AppointmentContext);
