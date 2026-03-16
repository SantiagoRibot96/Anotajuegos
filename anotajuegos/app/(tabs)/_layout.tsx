import { TabBar } from "@/constants/tabBar";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useTheme } from "../../hooks/themeHook";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.inactiveText,
        tabBarStyle: {
          ...TabBar.tabBarStyle,
          backgroundColor: theme.lighterBackground,
          paddingBottom: insets.bottom,
          height: 85 + insets.bottom,
        },
        tabBarLabelStyle: TabBar.tabBarLabelStyle,
        tabBarAllowFontScaling: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="truco"
        options={{
          title: "Truco",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/truco-icon.png")}
              style={[TabBar.tabBarIcon]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="milMillas"
        options={{
          title: "Mil Millas",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/milMillas-icon.png")}
              style={[TabBar.tabBarIcon]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="generala"
        options={{
          title: "Generala",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/generala-icon.png")}
              style={[TabBar.tabBarIcon]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ajedrez"
        options={{
          title: "Ajedrez",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/ajedrez-icon.png")}
              style={[TabBar.tabBarIcon]}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
