import Constants from 'expo-constants';
import React, {useState, useEffect, useRef} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {CustomHeader} from '../index'
import {  Button } from 'native-base';
import * as Notifications from 'expo-notifications';
import db, { auth } from '../../firebase';
import axios from 'axios';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

function NotificationsScreen (props) {
    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      
      registerForPushNotificationsAsync().then(token => {setExpoPushToken(token),
        axios.post(`https://app.nativenotify.com/api/expo/key`, { appId: 816, appToken: 'DVb32JJblpWfH3jiIfV1hY', expoToken: token })
     });

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title="Hatırlatıcılar" isHome={true} navigation={props.navigation}/>
        <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Hatırlatıcı</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Body: {notification && notification.request.content.body}</Text>
        </View>
        <Button onPress={async () => { await schedulePushNotification();}}>
          Hatırlatıcı Eklemek İçin Tıklayınız
        </Button>
      </View>


        </SafeAreaView>


      
    );
  }
  
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Currency App",
        body: 'Dövizleri Kontrol Et 🚨',
        data: { data: auth.currentUser.uid },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    let uid = auth.currentUser.uid;
    db.ref("users").child(uid).update({
      expoPushToken: token
    });
    return token;

}
export {NotificationsScreen}