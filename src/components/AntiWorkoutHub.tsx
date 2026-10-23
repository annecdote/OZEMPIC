import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Spacing } from '../constants/theme';
import { AntiWorkoutCalendar } from './AntiWorkoutCalendar';
import { CardioRestConverter } from './CardioRestConverter';

export function AntiWorkoutHub() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'converter'>('calendar');

  return (
    <View style={styles.hubWrapper}>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'calendar' && styles.activeTabButton]}
          onPress={() => setActiveTab('calendar')}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.tabButtonText, activeTab === 'calendar' && styles.activeTabText]}>
            Daily Message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'converter' && styles.activeTabButton]}
          onPress={() => setActiveTab('converter')}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.tabButtonText, activeTab === 'converter' && styles.activeTabText]}>
            Cardio Rest Converter
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentView}>
        {activeTab === 'calendar' ? (
          <AntiWorkoutCalendar />
        ) : (
          <CardioRestConverter />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  hubWrapper: {
    alignSelf: 'stretch',
    gap: Spacing.three,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    padding: 4,
    borderRadius: Spacing.three,
    alignSelf: 'stretch',
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: Spacing.one,
    alignItems: 'center',
    borderRadius: Spacing.two,
  },
  activeTabButton: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  tabButtonText: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#64748b',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#ff4757', 
  },
  contentView: {
    alignSelf: 'stretch',
  },
});