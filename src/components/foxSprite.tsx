import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { foxSpriteImageStyle, styles } from '../styles';

const FRAME_COUNTS = [5, 14, 8, 11, 5, 6, 7];

type FoxSpriteProps = {
  size?: number;
  animationRow: number;
};

export default function FoxSprite({ size = 96, animationRow }: FoxSpriteProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setFrame(0);
    const timer = setInterval(() => {
      setFrame(current => (current + 1) % FRAME_COUNTS[animationRow]);
    }, 120);

    return () => clearInterval(timer);
  }, [animationRow]);

  return (
    <View
      accessible
      accessibilityLabel="Animated fox"
      style={[styles.spriteViewport, { width: size, height: size }]}
    >
      <Image
        source={require('../../assets/VISUAL/fox_sprite_sheet.png')}
        resizeMode="stretch"
        style={foxSpriteImageStyle(size, frame, animationRow)}
      />
    </View>
  );
}