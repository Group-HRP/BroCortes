import { StyleSheet, Text, View } from "react-native";
import BroCortesIcon from "../../assets/logo/LogoBroCortes";

export default function CustomFlash({ textProps }: { textProps?: string }) {
  return (
    <View style={styles.container}>
      <BroCortesIcon width={40} height={40} />
      <Text style={styles.text}>{textProps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#292929",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
    margin: 10,
  },

  text: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    marginLeft: 10,
    textAlign: "center",
  },
});
