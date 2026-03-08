import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen 
            name="index"
            options={{title: 'Home'}}
        />
        <Tabs.Screen
            name="truco"
            options={{title: 'Truco'}}
        />
        <Tabs.Screen
            name="milMillas"
            options={{title: 'Mil Millas'}}
        />
        <Tabs.Screen
            name="generala"
            options={{title: 'Generala'}}
        />
    </Tabs>
  )
}

export default TabLayout