import { Box, Spinner, VStack, Text } from "native-base";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import delay from "@/utils/delay";
import useBarCodeScannerPermissions from "@/hooks/useBarCodeScannerPermissions";
import { usePersistStore } from "@/store";
import { Camera } from "expo-camera";

export default function Connect() {
  const setMachineIp = usePersistStore((state) => state.setMachineIp);
  const router = useRouter();

  const hasPermission = useBarCodeScannerPermissions(BarCodeScanner);

  const [scanned, setScanned] = useState(false);
  const handleScan = async ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    console.warn("开始扫描: ", type);
    await delay(1500);
    console.warn("二维码信息: ", data);
    setMachineIp(data);
    router.back();
  }

  if (hasPermission === null) {
    return <Text>请求相机权限...</Text>;
  }
  if (hasPermission === false) {
    return <Text>没有相机权限</Text>;
  }

  return (
    <Box flex={1} backgroundColor="gray.500">
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleScan}
        ratio="16:9"
        style={StyleSheet.absoluteFillObject}
      />

      <Box justifyContent="center" alignItems="center" position="absolute" top={0} left={0} right={0} bottom={0} opacity={scanned ? 1 : 0}>
        <VStack>
          <Spinner size="8xl" />
          <Text color={"primary.500"}>已扫描</Text>
        </VStack>
      </Box>

    </Box>
  )
}