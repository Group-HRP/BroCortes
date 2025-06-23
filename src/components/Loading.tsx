import { ActivityIndicator, View } from "react-native";

type LoadingProps = {
  size?: number | "small" | "large";
};

export const Loading = ({ size }: LoadingProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size ? size : "large"} color="#8B4513" />
    </View>
  );
};
