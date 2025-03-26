import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest, // 정밀 GPS
      });

      setLocation(loc);
    })();
  }, []);

  return { location, errorMsg };
};
