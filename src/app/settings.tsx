import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SymbolView } from 'expo-symbols';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NUTRITION_SCORE_STORAGE_KEY,
  SOUND_MUTED_STORAGE_KEY,
} from '../lib/storageKeys';
import { styles } from '../styles';

export default function SettingsScreen() {
  const [isMuted, setIsMuted] = useState<boolean | null>(null);
  const [isSavingMute, setIsSavingMute] = useState(false);
  const [isClearingScore, setIsClearingScore] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SOUND_MUTED_STORAGE_KEY)
      .then(value => {
        if (active) setIsMuted(value === 'true');
      })
      .catch(loadError => {
        if (active) {
          setError(
            loadError instanceof Error
              ? `Could not load sound setting: ${loadError.message}`
              : 'Could not load sound setting.',
          );
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleMute = async () => {
    if (isMuted === null || isSavingMute) return;
    const nextMuted = !isMuted;
    setIsSavingMute(true);
    setError('');
    setMessage('');

    try {
      await AsyncStorage.setItem(SOUND_MUTED_STORAGE_KEY, String(nextMuted));
      setIsMuted(nextMuted);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? `Could not save sound setting: ${saveError.message}`
          : 'Could not save sound setting.',
      );
    } finally {
      setIsSavingMute(false);
    }
  };

  const clearCache = async () => {
    if (isClearingScore) return;
    setIsClearingScore(true);
    setError('');
    setMessage('');

    try {
      await AsyncStorage.setItem(NUTRITION_SCORE_STORAGE_KEY, '0');
      //setMessage('Scoreboard reset to 0.');
    } catch (clearError) {
      setError(
        clearError instanceof Error
          ? `Could not reset scoreboard: ${clearError.message}`
          : 'Could not reset scoreboard.',
      );
    } finally {
      setIsClearingScore(false);
    }
  };

  return (
    <SafeAreaView style={styles.settingsScreen} edges={['top', 'right', 'bottom', 'left']}>
      <View style={styles.settingsHeader}>
        <Text style={styles.settingsTitle}>Settings</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isMuted ? 'Unmute sound' : 'Mute sound'}
        disabled={isMuted === null || isSavingMute}
        onPress={toggleMute}
        style={({ pressed }) => [
          styles.settingsCard,
          (isMuted === null || isSavingMute) && styles.settingsButtonDisabled,
          pressed && styles.nutritionPressed,
        ]}
      >
        <View
          style={[
            styles.settingsIconBadge,
            isMuted ? styles.settingsMutedIconBadge : styles.settingsSoundOnIconBadge,
          ]}
        >
          <SymbolView
            name={{
              ios: isMuted ? 'speaker.slash.fill' : 'speaker.wave.2.fill',
              android: isMuted ? 'volume_off' : 'volume_up',
              web: isMuted ? 'volume_off' : 'volume_up',
            }}
            tintColor={isMuted ? styles.settingsMutedIcon.color : styles.settingsSoundOnIcon.color}
            size={24}
          />
        </View>
        <View style={styles.settingsCardCopy}>
          <Text
            style={[
              styles.settingsCardTitle,
              isMuted === false && styles.settingsSoundOnText,
              isMuted === true && styles.settingsMutedText,
            ]}
          >
            {isMuted === null ? 'Sound' : isMuted ? 'Sound is muted' : 'Sound is on'}
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Clear cache and reset scoreboard to zero"
        disabled={isClearingScore}
        onPress={clearCache}
        style={({ pressed }) => [
          styles.settingsCard,
          isClearingScore && styles.settingsButtonDisabled,
          pressed && styles.nutritionPressed,
        ]}
      >
        <View style={[styles.settingsIconBadge, styles.settingsClearIconBadge]}>
          <SymbolView
            name={{ ios: 'trash.fill', android: 'delete_outline', web: 'delete_outline' }}
            tintColor={styles.settingsClearIcon.color}
            size={24}
          />
        </View>
        <View style={styles.settingsCardCopy}>
          <Text style={styles.settingsCardTitle}>
            {isClearingScore ? 'Resetting scoreboard…' : 'Clear cache'}
          </Text>
        </View>
      </Pressable>
      {error ? <Text style={styles.settingsError}>{error}</Text> : null}
      {message ? <Text style={styles.settingsMessage}>{message}</Text> : null}
    </SafeAreaView>
  );
}
