import { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors, fontFamily, styles } from '../../styles';

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
    "I do exercises. Well, mostly just eye rolling and stretching my luck.",
    "Why run when you can walk? Why walk when you can sit?",
    "My favorite gym machine is the vending machine.",
    "Resting is an investment in your personal couch comfort."
];

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function AntiWorkoutCalendar() {
  const todayStr = getLocalDateString(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [year, month, day] = selectedDate.split('-').map(Number);
  const totalDays = Date.UTC(year, month - 1, day) / (1000 * 60 * 60 * 24);
  const quoteIndex = Math.abs(totalDays) % MASTER_ANTI_WORKOUT_DB.length;
  const dailyMessage = MASTER_ANTI_WORKOUT_DB[quoteIndex];

  return (
    <View style={styles.calendarWrapper}>
      <View style={styles.calendarCard}>
        <Calendar
          current={todayStr}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: false, selectedColor: colors.primary }
          }}
          theme={{
            calendarBackground: colors.card,
            dayTextColor: colors.text,
            monthTextColor: colors.text,
            textSectionTitleColor: colors.textSecondary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.card,
            todayTextColor: colors.accent,
            arrowColor: colors.accent,
            textDayFontFamily: fontFamily,
            textMonthFontFamily: fontFamily,
            textDayHeaderFontFamily: fontFamily,
          }}
        />
      </View>

      <View style={styles.calendarMessage}>
        <Text style={styles.calendarMessageTitle}>
          Inspiration for {selectedDate}:
        </Text>
        <Text style={styles.calendarMessageBody}>
          &quot;{dailyMessage}&quot;
        </Text>
      </View>
    </View>
  );
}
