import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import { PlantProps } from './src/libs/storeage';


export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscriptions = Notifications.addNotificationReceivedListener(
      async notifications => {
        const data = notifications.request.content.data.plant as PlantProps;
        console.log(data);
      });

    return () => subscriptions.remove();

    async function notifications() {
      await Notifications.getAllScheduledNotificationsAsync();

      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log("#######N NOTFICAÇÕES AGENDADAS#######");
      console.log(data);
    }
    notifications();
  }, [])

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}

