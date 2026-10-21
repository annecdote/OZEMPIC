import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Spacing } from '../constants/theme';
export function CardioRestConverter() {
  const [minutes, setMinutes] = useState('');
  const [workoutType, setWorkoutType] = useState('running'); 
  const [result, setResult] = useState<{ couchHours: number; reward: string } | null>(null);

  const handleCalculate = () => {
    const minNum = parseFloat(minutes);
    if (isNaN(minNum) || minNum <= 0) return;

    let multiplier = 1;
    let customReward = '';

    if (workoutType === 'running') {
      multiplier = 6; 
      customReward = 'Guilt-Free Reality TV Binging and an extra slice of pizza.';
    } else if (workoutType === 'lifting') {
      multiplier = 4; 
      customReward = 'Uninterrupted couch nap time and complete authority over the TV remote.';
    } else {
      multiplier = 3; 
      customReward = 'Snoozing your morning alarm up to 3 times tomorrow without remorse.';
    }

    const totalMinutesEarned = minNum * multiplier;
    const hours = parseFloat((totalMinutesEarned / 60).toFixed(1));

    setResult({
      couchHours: hours,
      reward: customReward
    });
    
    setMinutes('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
       <View style={styles.card}> 
        <Text style={styles.cardTitle}> Cardio-to-Rest Converter</Text>
        <Text style={styles.subtitle}>Accidentally exercised? Input your metrics below to claim your laziness tokens.</Text>

        <View style={styles.selectorRow}>
          {['running', 'lifting', 'cycling'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.selectorButton, workoutType === type && styles.activeSelector]}
              onPress={() => {
                setWorkoutType(type);
                setResult(null);
              }}
            >
              <Text style={[styles.selectorText, workoutType === type && styles.activeSelectorText]}>
                {type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration of Mistake (Minutes):</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 30"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
          />
        </View>

        <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
          <Text style={styles.buttonText}> Cash Out Effort Tokens</Text>
        </TouchableOpacity>
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultHeader}> Couch Tokens Cleared!</Text>
            <Text style={styles.resultBody}>
              Your effort has successfully unlocked <Text style={styles.boldText}>{result.couchHours} hours</Text> of authorized, mandatory lounging.
            </Text>
            <Text style={styles.rewardText}> Unlocked Perk: {result.reward}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    marginTop: Spacing.three,
  },
  card: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 13,
    color: '#718096',
    marginBottom: Spacing.four,
    lineHeight: 18,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  activeSelector: {
    backgroundColor: '#ff4757',
    borderColor: '#ff4757',
  },
  selectorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  activeSelectorText: {
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: Spacing.three,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: Spacing.one,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: Spacing.two,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#334155',
    backgroundColor: '#f8fafc',
  },
  calcButton: {
    backgroundColor: '#2d4150',
    paddingVertical: 12,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultCard: {
    marginTop: Spacing.four,
    padding: Spacing.four,
    backgroundColor: '#eff6ff',
    borderRadius: Spacing.three,
    borderLeftWidth: 5,
    borderLeftColor: '#3b82f6',
  },
  resultHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: Spacing.one,
  },
  resultBody: {
    fontSize: 14,
    color: '#1e3a8a',
    lineHeight: 20,
    marginBottom: Spacing.two,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#ff4757',
  },
  rewardText: {
    fontSize: 13,
    color: '#1e3a8a',
    fontStyle: 'italic',
    fontWeight: '500',
  },
});