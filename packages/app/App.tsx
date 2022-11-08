import * as React from "react";
import { useState, useEffect } from "react";
import * as Battery from "expo-battery";
import * as Device from "expo-device";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const BACKGROUND_POST_TASK = "background-post";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_POST_TASK, async () => {
  const powerState = await Battery.getPowerStateAsync();

  // axios.post

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

/**
 * 1. send devicePowerState onMount
 * 2. setup a job to periodically send some data back
 * 3. fetch allDevicesPowerState and render it
 *
 * 4. make new wizard to create new dashboard or join existing
 *   a. existing session can generate link or qr code for new devices to join
 *
 * 5. make a server-side scheduled job that will scan through all records
 *    and send a push notification to alert to charge low battery devices
 *    https://docs.expo.dev/push-notifications/sending-notifications/
 *
 * 6. spam/abuse detection and protection
 */
export default function App() {
  const [hoho, setHoho] = useState<Battery.PowerState>();

  const sendDeviceBatteryStats = () => {
    console.log("Device.deviceName", Device.deviceName);
  };

  const hehe = async () => {
    const powerState = await Battery.getPowerStateAsync();
    setHoho(powerState);

    sendDeviceBatteryStats();
  };

  useEffect(() => {
    hehe();
  }, []);

  console.log(hoho);
  return (
    <View style={styles.container}>
      <Text>
        {Device.deviceName} Current Battery Level: {hoho?.batteryLevel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
