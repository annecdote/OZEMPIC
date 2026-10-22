<<<<<<< HEAD
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntiWorkoutHub } from '../components/AntiWorkoutHub';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={true}
        >
          
          <ThemedText type="title" style={styles.dashboardTitle}>
            Ozempic Dasboard
          </ThemedText>
          <AntiWorkoutHub />

        </ScrollView>
        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', flexDirection: 'row' },
  safeArea: { flex: 1, maxWidth: MaxContentWidth },
  scrollView: { flex: 1, width: '100%' },
  scrollContent: { 
    alignItems: 'center', 
    gap: Spacing.four, 
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two, 
    paddingBottom: BottomTabInset + Spacing.three 
  },
  dashboardTitle: { alignSelf: 'flex-start', marginVertical: Spacing.two, fontSize: 24, fontWeight: 'bold' },
});
=======
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/NUTRITION/nutrition" />;
}
>>>>>>> 35bf8c7 (nutrition screen)
