import { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoxSprite from '../../components/foxSprite';
import FoodSearchModal from './screenSearch';
import styles from '../../constants/nutritionStyling';

export default function HomeScreen() {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/cream.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.content}>
          <View style={styles.lowerContent}>
            <FoxSprite size={230} />
            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSearchVisible(true)}
                style={({ pressed }) => [styles.actionButton, styles.searchButton, pressed && styles.pressed]}
              >
                <View style={styles.searchIcon} />
                <Text style={styles.searchLabel}>Search food</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/NUTRITION/screenQR')}
                style={({ pressed }) => [styles.actionButton, styles.qrButton, pressed && styles.pressed]}
              >
                <View style={styles.qrIcon}>
                  <View style={styles.qrCorner} />
                  <View style={styles.qrCorner} />
                  <View style={styles.qrCorner} />
                  <View style={styles.qrCorner} />
                </View>
                <Text style={styles.qrLabel}>Scan QR</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <FoodSearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
      />
    </View>
  );
}
