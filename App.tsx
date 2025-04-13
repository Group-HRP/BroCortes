import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";
import theme from "./src/theme";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}
