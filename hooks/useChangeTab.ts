import { useNavigation, useFocusEffect, usePathname } from "expo-router";
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
  // const navigation = useNavigation();
  // const pathname = usePathname();
  // const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  // useEffect(() => {
  //   playSound(currentSound, setCurrentSound);
  // }, [pathname]);
};

export default useChangeTab;
