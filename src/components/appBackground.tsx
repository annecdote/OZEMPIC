import { Image } from 'expo-image';
import { styles } from '../styles';

export default function AppBackground() {
  return (
    <Image
      accessible={false}
      pointerEvents="none"
      source={require('../../assets/VISUAL/pastel_pixel_meadow.png')}
      contentFit="cover"
      style={styles.appBackgroundImage}
    />
  );
}
