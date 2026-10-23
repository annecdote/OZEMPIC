import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, styles } from '../styles';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarBackground: () => (
            <BlurView
              tint="light"
              intensity={75}
              style={styles.tabBarBackground}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="NUTRITION/nutrition"
          options={{
            title: 'Nutrition',
            tabBarIcon: ({ color, size }) => (
              <SymbolView name={{ ios: 'leaf.fill', android: 'nutrition', web: 'nutrition' }} tintColor={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="CALENDAR/AntiWorkoutHub"
          options={{
            title: 'Anti-Workout',
            tabBarIcon: ({ color, size }) => (
              <SymbolView name={{ ios: 'bed.double.fill', android: 'bed', web: 'bed' }} tintColor={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <SymbolView name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }} tintColor={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen name="NUTRITION/screenSearch" options={{ href: null }} />
        <Tabs.Screen name="NUTRITION/screenQR" options={{ href: null }} />
        <Tabs.Screen name="CALENDAR/AntiWorkoutCalendar" options={{ href: null }} />
        <Tabs.Screen name="CALENDAR/CardioRestConverter" options={{ href: null }} />
        <Tabs.Screen name="EXCUSES/index" options={{ href: null }} />
        <Tabs.Screen name="EXCUSES/explore" options={{ href: null }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
