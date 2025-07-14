import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";
import theme from "./src/theme";
import useLoadFonts from "./src/hooks/useLoadFonts";
import { ActivityIndicator } from "react-native";
import CustomFlash from "./src/components/FlashMessage";
import { ResetProvider } from "./src/context/ResetContext";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <AuthProvider>
      <ResetProvider>
        <ThemeProvider theme={theme}>
          <Routes />
          <FlashMessage
            message=""
            description=""
            position="bottom"
            style={{
              backgroundColor: "transparent",
            }}
            titleStyle={{
              color: "transparent",
            }}
            renderCustomContent={(menssage) => (
              <CustomFlash textProps={menssage?.message} />
            )}
          />
        </ThemeProvider>
      </ResetProvider>
    </AuthProvider>
  );
}
