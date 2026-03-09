import { ThemeProvider } from "../context/ThemeContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
      async function prepare() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await SplashScreen.hideAsync();
  }
      prepare();
  }, []);
  
  return (
    <ThemeProvider>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}