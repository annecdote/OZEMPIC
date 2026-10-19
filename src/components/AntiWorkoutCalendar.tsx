import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Spacing } from '../constants/theme';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const MASTER_ANTI_WORKOUT_DB = [
  "Every muscle deserves a cheat day. Especially today.",
  "Running burns calories. Sitting burns nothing, which is incredibly efficient.",
  "Your bed called. It said gym clothes look terrible on you.",
  "If you see me running, please check to see who is chasing me.",
  "I have an active lifestyle. I actively avoid working out.",
  "Sweat is just your body crying because it misses the couch.",
  "The only lifting I am doing today is lifting my spirits.",
  "I am into fitness. Fitness whole pizza in my mouth.",
  "Couch potato is not a lazy phase, it is a dedicated lifestyle choice.",
  "The gym is great, but have you tried sleeping for another hour?",
  "My favorite workout routine is closing my laptop and going to bed.",
  "I do exercises. Well, mostly just eye-rolling and stretching my luck.",
  "Why run when you can walk? Why walk when you can sit?",
  "My favorite gym machine is the vending machine.",
  "Resting is an investment in your personal couch comfort."
];

export function AntiWorkoutCalendar() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [dailyMessage, setDailyMessage] = useState<string>('');

  useEffect(() => {
    const dateHashNumber = selectedDate.split('-').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const quoteIndex = Math.abs(dateHashNumber) % MASTER_ANTI_WORKOUT_DB.length;
    setDailyMessage(MASTER_ANTI_WORKOUT_DB[quoteIndex]);
  }, [selectedDate]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.calendarWrapper}>
        <Calendar
          current={todayStr}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#ff4757' }
          }}
          theme={{
            selectedDayBackgroundColor: '#ff4757',
            todayTextColor: '#ff4757',
            arrowColor: '#ff4757',
               // @ts-ignore

            headerStyle: { paddingVertical: 12 },
          }}
        />
      </View>

      <ThemedView type="backgroundElement" style={styles.messageContainer}>
        <ThemedText type="subtitle" style={styles.messageTitle}>
          Inspiration for {selectedDate}:
        </ThemedText>
        
        <ThemedText style={styles.messageBody}>
          "{dailyMessage}"
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    gap: Spacing.three,
  },
  calendarWrapper: {
    borderRadius: Spacing.four,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  messageContainer: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    borderLeftWidth: 5,
    borderLeftColor: '#ff4757',
    minHeight: 100,
    justifyContent: 'center',
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageBody: {
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});