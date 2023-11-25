import { useState, useEffect } from "react";

const useBarCodeScannerPermissions = (BarCodeScanner: any) => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  return hasPermission;
}

export default useBarCodeScannerPermissions;