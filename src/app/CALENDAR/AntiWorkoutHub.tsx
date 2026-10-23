import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles';
import { AntiWorkoutCalendar } from './AntiWorkoutCalendar';
import { CardioRestConverter } from '../CALENDAR/CardioRestConverter';

export function AntiWorkoutHub() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'converter'>('calendar');

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.hubSafeArea}>
      <ScrollView
        style={styles.hubScrollView}
        contentContainerStyle={styles.hubScrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hubWrapper}>
          <View style={styles.hubTabBar}>
            <TouchableOpacity
              style={[styles.hubTabButton, activeTab === 'calendar' && styles.hubActiveTabButton]}
              onPress={() => setActiveTab('calendar')}
            >
              <Text style={[styles.hubTabButtonText, activeTab === 'calendar' && styles.hubActiveTabText]}>
                Daily Message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.hubTabButton, activeTab === 'converter' && styles.hubActiveTabButton]}
              onPress={() => setActiveTab('converter')}
            >
              <Text style={[styles.hubTabButtonText, activeTab === 'converter' && styles.hubActiveTabText]}>
                Cardio Rest Converter
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hubContent}>
            {activeTab === 'calendar' ? (
              <AntiWorkoutCalendar />
            ) : (
              <CardioRestConverter />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AntiWorkoutHub;