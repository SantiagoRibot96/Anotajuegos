import { Text, Image } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{backgroundColor: theme.background, alignItems: "center", justifyContent: "center", flex: 1}}>
      <Image source={require('../../assets/images/adaptive-icon.png')} style={{width: 200, height: 200, borderRadius: 10}}/>
      <Text style={{fontSize: 30, color: theme.text}}>AnotaJuegos</Text>
    </SafeAreaView>
  );
}