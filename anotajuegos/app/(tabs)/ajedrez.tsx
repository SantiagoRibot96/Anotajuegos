import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";

const Ajedrez = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 30, color: theme.text }}>Ajedrez</Text>
    </SafeAreaView>
  );
};

export default Ajedrez;
