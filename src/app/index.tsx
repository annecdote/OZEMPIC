import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <View style={styles.homeHeader}>
          <Text style={styles.homeLogo}>😴</Text>
          <Text style={styles.homeName}>OZEMPIC</Text>
          <Text style={styles.homeText}>Your daily excuse to do nothing</Text>
        </View>

        <View style={styles.homeCard}>
          <Text style={styles.homeEyebrow}>WELCOME TO YOUR SAFE SPACE</Text>
          <Text style={styles.homeEmoji}>🛋️</Text>
          <Text style={styles.homeTitle}>Welcome to your unproductive era.</Text>
          <Text style={styles.homeText}>
            Life is short. Your bed is comfortable. You do the math.
          </Text>
          <Text style={styles.homeMessage}>No pressure. No guilt. Just vibes.</Text>
        </View>

        <View style={styles.homeReminder}>
          <Text style={styles.homeTitle}>💗 Today&apos;s reminder</Text>
          <Text style={styles.homeText}>
            You don&apos;t have to be productive every day.
          </Text>
        </View>

        <View style={styles.homeBottomActions}>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.homeButton}
            onPress={() => router.navigate('/EXCUSES/explore')}
          >
            <Text style={styles.homeButtonText}>FIND MY EXCUSE</Text>
          </TouchableOpacity>

          <Text style={styles.homeFooter}>Take it easy. You deserve it ♡</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
