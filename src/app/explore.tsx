import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('/')}>
        <Text style={styles.back}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>The Excuse Room</Text>
      <Text style={styles.text}>Can't work out today? We've got you.</Text>

      <View style={styles.card}>
        <Text style={styles.emoji}>😴</Text>
        <Text style={styles.heading}>Need a good excuse?</Text>
        <Text style={styles.text}>Let us help you relax.</Text>

        <TouchableOpacity style={styles.button} onPress={getExcuse}>
          <Text style={styles.buttonText}>SPIN THE WHEEL 🎲</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reminder}>
        <Text style={styles.heading}>💗 Remember</Text>
        <Text style={styles.text}>Taking a break is okay.</Text>
      </View>

      <Modal visible={show} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.emoji}>🛋️</Text>
            <Text style={styles.heading}>YOUR EXCUSE</Text>
            <Text style={styles.excuse}>{excuse}</Text>

            <TouchableOpacity style={styles.button} onPress={getExcuse}>
              <Text style={styles.buttonText}>Give Me Another 🎲</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShow(false)}>
              <Text style={styles.done}>I'm satisfied</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  back: {
    color: colors.accent,
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
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
    marginTop: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emoji: {
    fontSize: 45,
    margin: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  reminder: {
    backgroundColor: colors.secondary,
    padding: 18,
    borderRadius: 20,
    marginTop: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  popup: {
    backgroundColor: colors.background,
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  close: {
    fontSize: 25,
    color: colors.text,
  },
  excuse: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    margin: 20,
  },
  done: {
    color: colors.textSecondary,
    marginTop: 20,
  },
});