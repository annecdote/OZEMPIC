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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { proteinStarRating, searchFoods, type FoodSearchResult } from '../../lib/nutritionAPI';
import { colors, styles } from '../../styles';

type FoodSearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectFood: (points: number) => void;
};

export default function FoodSearchModal({
  visible,
  onClose,
  onSelectFood,
}: FoodSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
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
      <SafeAreaProvider>
        <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.nutritionSearchScreen}>
          <KeyboardAvoidingView
            style={styles.nutritionSearchScreen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.nutritionSearchHeader}>
              <View>
                <Text style={styles.nutritionSearchTitle}>Find a food</Text>
                <Text style={styles.nutritionSearchSubtitle}>Look up calories and nutrition</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close food search"
                onPress={closeSearch}
                style={styles.nutritionCloseButton}
              >
                <Text style={styles.nutritionCloseButtonText}>×</Text>
              </Pressable>
            </View>

            <View style={styles.nutritionSearchForm}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={runFoodSearch}
                placeholder="e.g. banana, oatmeal"
                placeholderTextColor={colors.textSecondary}
                returnKeyType="search"
                style={styles.nutritionSearchInput}
                accessibilityLabel="Search foods"
              />
              <Pressable
                accessibilityRole="button"
                onPress={runFoodSearch}
                disabled={searchLoading}
                style={({ pressed }) => [styles.nutritionSubmitSearchButton, pressed && styles.nutritionPressed]}
              >
                <Text style={styles.nutritionSubmitSearchText}>Search</Text>
              </Pressable>
            </View>

            <Text style={styles.nutritionResultsCaption}>Nutrition values are per 100 g.</Text>

            {searchLoading ? (
              <View style={styles.nutritionSearchMessage}>
                <ActivityIndicator color={colors.accent} />
                <Text style={styles.nutritionMessageText}>Searching foods…</Text>
              </View>
            ) : searchError ? (
              <Text style={styles.nutritionErrorText}>{searchError}</Text>
            ) : searchResults.length === 0 ? (
              <Text style={styles.nutritionEmptyText}>Search for a food to see matching products.</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.nutritionResultsList}>
                {searchResults.map(result => {
                  const stars = proteinStarRating(result.protein);
                  return (
                    <View key={result.id} style={styles.nutritionResultCard}>
                      <View style={styles.nutritionResultHeading}>
                        <View style={styles.nutritionResultNameContainer}>
                          <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={`Select ${result.name}`}
                            onPress={() => {
                              onSelectFood(stars * 3);
                              closeSearch();
                            }}
                          >
                            <Text style={styles.nutritionResultName}>{result.name}</Text>
                          </Pressable>
                          <Text style={styles.nutritionResultServing}>Serving: {result.serving}</Text>
                        </View>
                        <View
                          accessible
                          accessibilityLabel={
                            result.protein === null
                              ? 'Protein information unavailable'
                              : `${result.protein} grams of protein, ${stars} out of 5 stars`
                          }
                          style={styles.nutritionRatingStars}
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <Text key={rating} style={styles.nutritionStar}>
                              {rating <= stars ? '★' : '☆'}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}
