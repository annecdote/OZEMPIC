import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodSearchResult, searchFoods } from '../../lib/nutritionAPI';
import styles from '../../constants/nutritionStyling';

type FoodSearchModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function FoodSearchModal({ visible, onClose }: FoodSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [foodRatings, setFoodRatings] = useState<Record<string, number>>({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const closeSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError('');
    onClose();
  };

  const runFoodSearch = async () => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchError('Enter a food to search for.');
      return;
    }

    setSearchLoading(true);
    setSearchError('');
    setSearchResults([]);
    try {
      setSearchResults(await searchFoods(query));
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : 'Could not search foods.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={closeSearch}
    >
      <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.searchScreen}>
          <KeyboardAvoidingView
            style={styles.searchScreen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.searchHeader}>
              <View>
                <Text style={styles.searchTitle}>Find a food</Text>
                <Text style={styles.searchSubtitle}>Look up calories and nutrition</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close food search"
                onPress={closeSearch}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>

            <View style={styles.searchForm}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={runFoodSearch}
                placeholder="e.g. banana, oatmeal"
                placeholderTextColor="#91897D"
                returnKeyType="search"
                style={styles.searchInput}
                accessibilityLabel="Search foods"
              />
              <Pressable
                accessibilityRole="button"
                onPress={runFoodSearch}
                disabled={searchLoading}
                style={({ pressed }) => [styles.submitSearchButton, pressed && styles.pressed]}
              >
                <Text style={styles.submitSearchText}>Search</Text>
              </Pressable>
            </View>

            <Text style={styles.resultsCaption}>Nutrition values are per 100 g.</Text>

            {searchLoading ? (
              <View style={styles.searchMessage}>
                <ActivityIndicator color="#9C5140" />
                <Text style={styles.messageText}>Searching foods…</Text>
              </View>
            ) : searchError ? (
              <Text style={styles.errorText}>{searchError}</Text>
            ) : searchResults.length === 0 ? (
              <Text style={styles.emptyText}>Search for a food to see matching products.</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.resultsList}>
                {searchResults.map(result => (
                  <View key={result.id} style={styles.resultCard}>
                    <View style={styles.resultHeading}>
                      <View style={styles.resultNameContainer}>
                        <Text style={styles.resultName}>{result.name}</Text>
                        <Text style={styles.resultServing}>Serving: {result.serving}</Text>
                      </View>
                      <View style={styles.ratingStars} accessibilityLabel="Rate this food from one to five stars">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <Pressable
                            key={rating}
                            accessibilityRole="button"
                            accessibilityLabel={`${rating} star${rating === 1 ? '' : 's'}`}
                            onPress={() => setFoodRatings(current => ({ ...current, [result.id]: rating }))}
                            hitSlop={4}
                          >
                            <Text style={[
                              styles.star,
                              rating <= (foodRatings[result.id] ?? 0) && styles.selectedStar,
                            ]}>
                              {rating <= (foodRatings[result.id] ?? 0) ? '★' : '☆'}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
