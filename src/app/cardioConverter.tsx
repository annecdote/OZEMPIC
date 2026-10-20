import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardioRestConverter } from '@/components/CardioRestConverter';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function CardioConverterScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
          <Text style={styles.backLinkText}> Back to Hub</Text>
        </TouchableOpacity>

        <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
          <CardioRestConverter />
        </ScrollView>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', flexDirection: 'row' },
  safeArea: { flex: 1, paddingHorizontal: Spacing.four, maxWidth: MaxContentWidth },
  scrollContent: { paddingTop: Spacing.two, paddingBottom: BottomTabInset + Spacing.three },
  backLink: { paddingVertical: 10, alignSelf: 'flex-start', marginBottom: Spacing.two },
  backLinkText: { color: '#ff4757', fontWeight: 'bold', fontSize: 14 }
});