import { Tabs } from 'expo-router';
import { Image } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TabBar } from '@/constants/tabBar';

const TabLayout = () => {
    const theme = useTheme();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.text,
            tabBarInactiveTintColor: theme.inactiveText,
            tabBarStyle: {
                ...TabBar.tabBarStyle,
                backgroundColor: theme.lighterBackground,
                },
            tabBarLabelStyle: TabBar.tabBarLabelStyle,
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    href: null,
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="truco"
                options={{
                    title: 'Truco',
                    tabBarIcon: () => <Image source={require('../../assets/images/truco-icon.png')} style={[TabBar.tabBarIcon]}/>,
                }}
            />
            <Tabs.Screen
                name="milMillas"
                options={{
                    title: 'Mil Millas',
                    tabBarIcon: () => <Image source={require('../../assets/images/milMillas-icon.png')} style={[TabBar.tabBarIcon]}/>,
                }}
            />
            <Tabs.Screen
                name="generala"
                options={{
                    title: 'Generala',
                    tabBarIcon: () => <Image source={require('../../assets/images/generala-icon.png')} style={[TabBar.tabBarIcon]}/>,
                }}
            />
        </Tabs>
    )
}

export default TabLayout