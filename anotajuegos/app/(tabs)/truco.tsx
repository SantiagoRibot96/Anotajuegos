import { Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Truco = () => {
  const theme = useTheme();
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <Text style={{fontSize: 30, color: theme.text}}>Truco</Text>
    </SafeAreaView>
  )
}

export default Truco