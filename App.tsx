import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";
import theme from "./src/theme";
import useLoadFonts from "./src/hooks/useLoadFonts";
import { ActivityIndicator } from "react-native";

export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}
