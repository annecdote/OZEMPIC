import { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles';

const excuses = [
  'My bed needs me.',
  'I am too tired today.',
  'My motivation is on vacation.',
  'I would rather eat fries.',
  'My couch needs me.',
  'Today is a lazy day.',
  'I need a break.',
  'Maybe tomorrow!',
];

export default function ExcusesScreen() {
  const router = useRouter();
  const [excuse, setExcuse] = useState('');
  const [show, setShow] = useState(false);

  function getExcuse() {
    const number = Math.floor(Math.random() * excuses.length);
    setExcuse(excuses[number]);
    setShow(true);
  }

  return (
    <SafeAreaView style={styles.excusesContainer}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => router.navigate('/')}
      >
        <Text style={styles.excusesBack}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.excusesTitle}>The Excuse Room</Text>
      <Text style={styles.excusesText}>Can&apos;t work out today? We&apos;ve got you.</Text>

      <View style={styles.excusesCard}>
        <Text style={styles.excusesEmoji}>😴</Text>
        <Text style={styles.excusesHeading}>Need a good excuse?</Text>
        <Text style={styles.excusesText}>Let us help you relax.</Text>

        <TouchableOpacity
          accessibilityRole="button"
          style={styles.excusesButton}
          onPress={getExcuse}
        >
          <Text style={styles.excusesButtonText}>ROLL THE DICE 🎲</Text>
        </TouchableOpacity>
      </View>

      {excuse !== '' && (
        <View style={styles.excusesReminder}>
          <Text style={styles.excusesHeading}>Your Selected Excuse</Text>
          <Text style={styles.excusesQuote}>{excuse}</Text>
        </View>
      )}

      <View style={styles.excusesReminder}>
        <Text style={styles.excusesHeading}>💗 Remember</Text>
        <Text style={styles.excusesText}>Taking a break is okay.</Text>
      </View>

      <Modal
        visible={show}
        transparent
        animationType="fade"
        onRequestClose={() => setShow(false)}
      >
        <View style={styles.excusesOverlay}>
          <View style={styles.excusesPopup}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Close excuse"
              onPress={() => setShow(false)}
            >
              <Text style={styles.excusesClose}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.excusesEmoji}>🛋️</Text>
            <Text style={styles.excusesHeading}>YOUR EXCUSE</Text>
            <Text style={styles.excusesQuote}>{excuse}</Text>

            <TouchableOpacity
              accessibilityRole="button"
              style={styles.excusesButton}
              onPress={getExcuse}
            >
              <Text style={styles.excusesButtonText}>Give Me Another 🎲</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setShow(false)}
            >
              <Text style={styles.excusesDone}>I&apos;m satisfied</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}