import { AntiWorkoutHub } from '@/components/AntiWorkoutHub';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator>
        <View style={styles.content}>
          <Text style={styles.dashboardTitle}>Workout Dashboard</Text>
          <AntiWorkoutHub />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  scrollView: { flex: 1, width: '100%' },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  content: { gap: Spacing.four },
  dashboardTitle: {
    marginVertical: Spacing.two,
    fontSize: 24,
    fontWeight: 'bold',
  },
});