import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { carrotSpriteImageStyle, styles } from '../styles';

const FRAME_COUNT = 17.8;
const SPRITE_HEIGHT = 468;
const SPRITE_CROP_TOP = 170;
const SPRITE_WIDTH = (2043 / FRAME_COUNT) * (SPRITE_HEIGHT / (770 - SPRITE_CROP_TOP));

type CarrotSpriteProps = {
  animationId: number | null;
  onDropStart: () => void;
  onEaten: () => void;
};

export default function CarrotSprite({
  animationId,
  onDropStart,
  onEaten,
}: CarrotSpriteProps) {
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(false);
  const eatSound = useAudioPlayer(require('../../assets/SOUND/soundEat.mp3'));

  useEffect(() => {
    if (animationId === null || animationId === 0) return;

    setFrame(0);
    setVisible(true);
    onDropStart();
    let nextFrame = 0;
    const timer = setInterval(() => {
      nextFrame += 1;
      if (nextFrame >= FRAME_COUNT) {
        clearInterval(timer);
        setVisible(false);
        void eatSound.seekTo(0).then(() => eatSound.play()).catch(error => {
          console.error('Could not play the carrot eating sound.', error);
        });
        onEaten();
        return;
      }
      setFrame(nextFrame);
    }, 100);

    return () => clearInterval(timer);
  }, [animationId, eatSound, onDropStart, onEaten]);

  if (!visible) return null;

  return (
    <View
      accessible
      accessibilityLabel="A carrot dangling and swinging"
      style={[
        styles.carrotSpriteViewport,
        { width: SPRITE_WIDTH, height: SPRITE_HEIGHT },
      ]}
    >
      <Image
        source={require('../../assets/VISUAL/carrot_sprite.png')}
        resizeMode="stretch"
        style={carrotSpriteImageStyle(SPRITE_HEIGHT, frame)}
      />
    </View>
  );
}
