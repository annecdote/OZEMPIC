import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../components/appBackground';
import FoxSprite from '../../components/foxSprite';
import CarrotSprite from '../../components/carrotSprite';
import FoodSearchModal from './screenSearch';
import { styles } from '../../styles';

const SCORE_STORAGE_KEY = 'nutrition_score';

export default function HomeScreen() {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreReady, setScoreReady] = useState(false);
  const [scoreStorageError, setScoreStorageError] = useState('');
  const [carrotAnimationId, setCarrotAnimationId] = useState(0);
  const [carrotAnimating, setCarrotAnimating] = useState(false);
  const [foxAnimationRow, setFoxAnimationRow] = useState(5);
  const storageWriteQueue = useRef(Promise.resolve());

  useFocusEffect(
    useCallback(() => {
      let active = true;

      AsyncStorage.getItem(SCORE_STORAGE_KEY)
        .then(storedScore => {
          if (!active) return;
          if (storedScore !== null) {
            const parsedScore = Number(storedScore);
            if (!Number.isSafeInteger(parsedScore) || parsedScore < 0) {
              throw new Error('Saved score is invalid.');
            }
            setScore(parsedScore);
          }
          setScoreReady(true);
        })
        .catch(error => {
          if (!active) return;
          setScoreStorageError(
            error instanceof Error
              ? `Could not load saved score: ${error.message}`
              : 'Could not load saved score.',
          );
        });

      return () => {
        active = false;
      };
    }, []),
  );

  useEffect(() => {
    if (!scoreReady) return;

    storageWriteQueue.current = storageWriteQueue.current
      .then(() => AsyncStorage.setItem(SCORE_STORAGE_KEY, String(score)))
      .then(() => setScoreStorageError(''))
      .catch(error => {
        setScoreStorageError(
          error instanceof Error
            ? `Could not save score: ${error.message}`
            : 'Could not save score.',
        );
      });
  }, [score, scoreReady]);

  useEffect(() => {
    if (foxAnimationRow !== 4) return;

    const timer = setTimeout(() => setFoxAnimationRow(5), 10_000);
    return () => clearTimeout(timer);
  }, [foxAnimationRow]);

  const handleCarrotDrop = useCallback(() => {
    setCarrotAnimating(true);
    setFoxAnimationRow(3);
  }, []);
  const handleCarrotEaten = useCallback(() => {
    setCarrotAnimating(false);
    setFoxAnimationRow(4);
  }, []);
  const lowerCarrot = useCallback(() => {
    if (!scoreReady || score < 15 || carrotAnimating) return;

    setScore(current => current - 15);
    setCarrotAnimationId(current => current + 1);
  }, [carrotAnimating, score, scoreReady]);

  return (
    <View style={styles.nutritionContainer}>
      <AppBackground />
      <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.nutritionContent}>
        <View style={styles.nutritionScoreboard}>
          <Image
            accessible={false}
            source={require('../../../assets/VISUAL/wooden_scoreboard.png')}
            contentFit="contain"
            style={styles.nutritionScoreboardImage}
          />
          <Text style={styles.nutritionScore}>{score}</Text>
        </View>
        {scoreStorageError ? (
          <Text style={styles.nutritionStorageError}>{scoreStorageError}</Text>
        ) : null}
        <View pointerEvents="none" style={styles.nutritionCarrot}>
          <CarrotSprite
            animationId={carrotAnimationId}
            onDropStart={handleCarrotDrop}
            onEaten={handleCarrotEaten}
          />
        </View>
        <View style={styles.nutritionLowerContent}>
          <View style={styles.nutritionFox}>
            <FoxSprite size={230} animationRow={foxAnimationRow} />
          </View>
          <View style={styles.nutritionActions}>
            <Pressable
              accessibilityRole="button"
              disabled={!scoreReady}
              onPress={() => setSearchVisible(true)}
              style={({ pressed }) => [
                styles.nutritionActionButton,
                styles.nutritionSearchButton,
                !scoreReady && styles.nutritionLowerCarrotDisabled,
                pressed && styles.nutritionPressed,
              ]}
            >
              <View style={styles.nutritionSearchIcon} />
              <Text style={styles.nutritionSearchLabel}>Search food</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/NUTRITION/screenQR')}
              style={({ pressed }) => [styles.nutritionActionButton, styles.nutritionQrButton, pressed && styles.nutritionPressed]}
            >
              <View style={styles.nutritionQrIcon}>
                <View style={styles.nutritionQrCorner} />
                <View style={styles.nutritionQrCorner} />
                <View style={styles.nutritionQrCorner} />
                <View style={styles.nutritionQrCorner} />
              </View>
              <Text style={styles.nutritionQrLabel}>Scan QR</Text>
            </Pressable>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Lower carrot for 15 points"
            disabled={!scoreReady || score < 15 || carrotAnimating}
            onPress={lowerCarrot}
            style={({ pressed }) => [
              styles.nutritionLowerCarrotButton,
              (!scoreReady || score < 15 || carrotAnimating) && styles.nutritionLowerCarrotDisabled,
              pressed && styles.nutritionPressed,
            ]}
          >
            <Text style={styles.nutritionLowerCarrotText}>
              feed carrot · 15 points
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <FoodSearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSelectFood={points => {
          if (scoreReady) setScore(current => current + points);
        }}
      />
    </View>
  );
}
