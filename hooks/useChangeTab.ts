import { useNavigation, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

async function playSound(
  currentSound: Sound | null,
  setCurrentSound: (s: Sound) => void
) {
  if (currentSound) {
    await currentSound.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(
    require("@/assets/sounds/transition.mp3"),
    {
      volume: 1,
    }
  );
  setCurrentSound(sound);
  await sound.playAsync();
}

const useChangeTab = () => {
  const navigation = useNavigation();
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", async () => {
      // 在路由状态更改时执行逻辑
      await playSound(currentSound, setCurrentSound);
    });
    return unsubscribe;
  }, [navigation]);
};

export default useChangeTab;
