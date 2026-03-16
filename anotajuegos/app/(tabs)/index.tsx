import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";

export default function Index() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Image
        source={require("../../assets/images/adaptive-icon.png")}
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 30, color: theme.text }} allowFontScaling={false}>AnotaJuegos</Text>
    </SafeAreaView>
  );
}
