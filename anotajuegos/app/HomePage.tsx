import { Text, View, StyleSheet, useColorScheme } from "react-native";
import React from 'react'

const HomePage = () => {
    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightThemeContainer : styles.darkThemeContainer;
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>HomePage</Text>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  lightThemeContainer: {
    backgroundColor: '#F6F7F9',
  },
  lightThemeText: {
    color: '#1F2933',
  },
  darkThemeContainer: {
    backgroundColor: '#121417',
  },
  darkThemeText: {
    color: '#F3F4F6',
  },
});