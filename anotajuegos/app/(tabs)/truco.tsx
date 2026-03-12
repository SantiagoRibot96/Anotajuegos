import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";

const Truco = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 30, color: theme.text }}>Truco</Text>
    </SafeAreaView>
  );
};

export default Truco;
