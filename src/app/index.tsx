import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>😴</Text>
        <Text style={styles.name}>OZEMPIC</Text>
        <Text style={styles.text}>Your daily excuse to do nothing</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.small}>WELCOME TO YOUR SAFE SPACE</Text>
        <Text style={styles.emoji}>🛋️</Text>
        <Text style={styles.title}>Welcome to your unproductive era.</Text>
        <Text style={styles.text}>
          Life is short. Your bed is comfortable. You do the math.
        </Text>
        <Text style={styles.message}>No pressure. No guilt. Just vibes.</Text>
      </View>

      <View style={styles.reminder}>
        <Text style={styles.title}>💗 Today's reminder</Text>
        <Text style={styles.text}>
          You don't have to be productive every day.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/explore')}
      >
        <Text style={styles.buttonText}>FIND MY EXCUSE →</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Take it easy. You deserve it ♡</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    fontSize: 40,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  text: {
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.card,
    padding: 22,
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  small: {
    color: colors.accent,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emoji: {
    fontSize: 35,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
  },
  message: {
    color: colors.accent,
    marginTop: 20,
  },
  reminder: {
    backgroundColor: colors.secondary,
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.text,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
  },
});