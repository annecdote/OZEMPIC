import { useEffect, useState } from 'react';
import { Image, ImageStyle, Platform, Pressable } from 'react-native';

const COLUMNS = 14;
const ROWS = 7;
const FRAME_COUNTS = [5, 14, 8, 11, 5, 6, 7];

export default function FoxSprite({ size = 96 }: { size?: number }) {
  const [frame, setFrame] = useState(0);
  const [animationRow, setAnimationRow] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(current => (current + 1) % FRAME_COUNTS[animationRow]);
    }, 120);

    return () => clearInterval(timer);
  }, [animationRow]);

  const changeAnimation = () => {
    setFrame(0);
    setAnimationRow(current => (current + 1) % ROWS);
  };

  const spriteStyle = {
    position: 'absolute' as const,
    width: COLUMNS * size,
    height: ROWS * size,
    left: -frame * size,
    top: -animationRow * size,
    ...(Platform.OS === 'web' ? { imageRendering: 'pixelated' as const } : {}),
  } as ImageStyle & { imageRendering?: 'pixelated' };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fox animation. Tap to change animation."
      onPress={changeAnimation}
      style={{ width: size, height: size, overflow: 'hidden' }}
    >
      <Image
        source={require('../../assets/VISUAL/fox_sprite_sheet.png')}
        resizeMode="stretch"
        style={spriteStyle}
      />
    </Pressable>
  );
}