import { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, styles } from '../../styles';

type WorkoutType = 'running' | 'lifting' | 'cycling';
const workoutTypes: WorkoutType[] = ['running', 'lifting', 'cycling'];

type WorkoutLog = {
  id: string;
  date: string;
  workout: WorkoutType;
  minutes: number;
  restHours: number;
};

const WORKOUT_LOGS_KEY = 'workout_logs';
const MAX_WORKOUT_LOGS = 4;

function normalizeWorkoutLog(value: unknown): WorkoutLog | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const log = value as Record<string, unknown>;
  const minutes =
    typeof log.minutes === 'number'
      ? log.minutes
      : typeof log.mins === 'string'
        ? Number(log.mins)
        : NaN;

  if (
    typeof log.id !== 'string' ||
    typeof log.date !== 'string' ||
    (log.workout !== 'running' && log.workout !== 'lifting' && log.workout !== 'cycling') ||
    !Number.isFinite(minutes) ||
    minutes <= 0 ||
    typeof log.restHours !== 'number' ||
    !Number.isFinite(log.restHours)
  ) {
    return null;
  }

  return {
    id: log.id,
    date: log.date,
    workout: log.workout,
    minutes,
    restHours: log.restHours,
  };
}

export function CardioRestConverter() {
  const [minutes, setMinutes] = useState('');
  const [workoutType, setWorkoutType] = useState<WorkoutType>('running');
  const [result, setResult] = useState<{ couchHours: number; reward: string } | null>(null);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(WORKOUT_LOGS_KEY)
      .then(async (storedLogs) => {
        if (!storedLogs) return;

        const parsedLogs: unknown = JSON.parse(storedLogs);
        if (!Array.isArray(parsedLogs)) {
          throw new Error('Saved workout history has an invalid format.');
        }

        const normalizedLogs = parsedLogs.map(normalizeWorkoutLog);
        if (!normalizedLogs.every((log): log is WorkoutLog => log !== null)) {
          throw new Error('Saved workout history has an invalid format.');
        }

        const recentLogs = normalizedLogs.slice(0, MAX_WORKOUT_LOGS);
        if (isMounted) {
          setLogs(recentLogs);
          await AsyncStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(recentLogs));
        }
      })
      .catch(() => {
        if (isMounted) {
          setStorageError('Could not load saved workout history.');
        }
      })
      .finally(() => {
        if (isMounted) setStorageReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCalculate = async () => {
    const minNum = parseFloat(minutes);
    if (!Number.isFinite(minNum) || minNum <= 0) {
      setFormError('Enter a workout duration greater than zero.');
      return;
    }

    const rewards: Record<WorkoutType, { multiplier: number; reward: string }> = {
      running: {
        multiplier: 6,
        reward: 'Guilt-Free Reality TV Binging and an extra slice of pizza.',
      },
      lifting: {
        multiplier: 4,
        reward: 'Uninterrupted couch nap time and complete authority over the TV remote.',
      },
      cycling: {
        multiplier: 3,
        reward: 'Snoozing your morning alarm up to 3 times tomorrow without remorse.',
      },
    };
    const { multiplier, reward: customReward } = rewards[workoutType];

    const totalMinutesEarned = minNum * multiplier;
    const hours = parseFloat((totalMinutesEarned / 60).toFixed(1));

    setResult({ couchHours: hours, reward: customReward });
    setFormError('');
    setMinutes('');
    Keyboard.dismiss();

    const newLog: WorkoutLog = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      workout: workoutType,
      minutes: minNum,
      restHours: hours,
    };
    const nextLogs = [newLog, ...logs].slice(0, MAX_WORKOUT_LOGS);

    setSaving(true);
    try {
      await AsyncStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(nextLogs));
      setLogs(nextLogs);
      setStorageError('');
    } catch {
      setStorageError('Could not save this workout to history.');
    } finally {
      setSaving(false);
    }
  };

  const clearLogs = async () => {
    setSaving(true);
    try {
      await AsyncStorage.removeItem(WORKOUT_LOGS_KEY);
      setLogs([]);
      setResult(null);
      setStorageError('');
    } catch {
      setStorageError('Could not clear saved workout history.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.converterWrapper}>
       <View style={styles.converterCard}>
        <Text style={styles.converterTitle}> Cardio-to-Rest Converter</Text>
        <Text style={styles.converterSubtitle}>Accidentally exercised? Input your metrics below to claim your laziness tokens.</Text>

        <View style={styles.converterSelectorRow}>
          {workoutTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.converterSelectorButton, workoutType === type && styles.converterActiveSelector]}
              onPress={() => {
                setWorkoutType(type);
                setResult(null);
              }}
            >
              <Text style={[styles.converterSelectorText, workoutType === type && styles.converterActiveSelectorText]}>
                {type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.converterInputGroup}>
          <Text style={styles.converterLabel}>Duration of Mistake (Minutes):</Text>
          <TextInput
            style={styles.converterInput}
            placeholder="e.g., 30"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={minutes}
            onChangeText={(value) => {
              setMinutes(value);
              setFormError('');
            }}
          />
        </View>

        {formError ? <Text style={styles.converterError}>{formError}</Text> : null}
        <TouchableOpacity
          accessibilityRole="button"
          disabled={!storageReady || saving}
          style={[styles.converterButton, (!storageReady || saving) && styles.converterDisabled]}
          onPress={handleCalculate}
        >
          <Text style={styles.converterButtonText}>
            {!storageReady ? 'Loading history…' : 'Cash Out Effort Tokens'}
          </Text>
        </TouchableOpacity>
        {result && (
          <View style={styles.converterResult}>
            <Text style={styles.converterResultTitle}> Couch Tokens Cleared!</Text>
            <Text style={styles.converterResultBody}>
              Your effort has successfully unlocked <Text style={styles.converterBoldText}>{result.couchHours} hours</Text> of authorized, mandatory lounging.
            </Text>
            <Text style={styles.converterReward}> Unlocked Perk: {result.reward}</Text>
          </View>
        )}

        {storageError ? <Text style={styles.converterError}>{storageError}</Text> : null}

        {logs.length > 0 && (
          <View style={styles.converterHistory}>
            <View style={styles.converterHistoryHeader}>
              <Text style={styles.converterHistoryTitle}>Saved Workouts</Text>
              <TouchableOpacity
                accessibilityRole="button"
                disabled={saving}
                onPress={clearLogs}
              >
                <Text style={styles.converterDeleteText}>Clear history</Text>
              </TouchableOpacity>
            </View>
            {logs.map((log) => (
              <View key={log.id} style={styles.converterHistoryRow}>
                <Text style={styles.converterHistoryText}>
                  {formatLogDate(log.date)}: {log.minutes} min {log.workout} = {log.restHours} hr rest
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function formatLogDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}