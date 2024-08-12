import * as firebase from "firebase/app";
import "firebase/messaging";
import AxiosRequest from './AxiosRequest'
import { getLoginDetail, getAdminId } from "./utils/ConstantFunction";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "firebase-api-key",
  authDomain: "eat-admin.firebaseapp.com",
  databaseURL: "https://eat-admin.firebaseio.com",
  projectId: "eat-admin",
  storageBucket: "",
  messagingSenderId: "238215317598",
  appId: "1:238215317598:web:e81545181c32cb04174ccf"
});

if (firebase.messaging.isSupported()) {
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "<push-notification-key>"
);
messaging.requestPermission()
  .then(async function() {
    const token = await messaging.getToken();
    console.log("token-->"+token);
    window.localStorage.setItem('push_token', token);
    var admin_id=getAdminId();
    if(admin_id) {
      AxiosRequest.Admin.update({admin_userid:admin_id,push_token:token})
    }
    
  })
  .catch(function(err) {
    console.log("Unable to get permission to notify.", err);
  });

messaging.onMessage(function(payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    sound: 'http://eatalltime.global/alert.mp3',
    icon: './assets/img/favicon.ico',
    requireInteraction:true,
    vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]
  };

  if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(notificationTitle, notificationOptions);
      });
  }
});
}
export { initializedFirebaseApp };