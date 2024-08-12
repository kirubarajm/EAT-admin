importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const examplePage = self.location.origin;
const orderAssign = '/eatadmin/makeit-vorders';
var firebaseConfig = {
  // Project Settings => Add Firebase to your web app
  messagingSenderId: "238215317598",
};
  firebase.initializeApp(firebaseConfig);
  if (firebase.messaging) {
  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.message,
      sound: 'https://eatalltime.global/eatadmin/alert.mp3',
      icon: './favicon.ico',
      requireInteraction:true,
      vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]
    };
    
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

}

function openWindow(event) {
  /**** START notificationOpenWindow ****/
  
  const promiseChain = clients.openWindow(examplePage);
  event.waitUntil(promiseChain);
  /**** END notificationOpenWindow ****/
}

function focusWindow(event) {
  /**** START notificationFocusWindow ****/
  /**** START urlToOpen ****/
  console.log("self.location.origin-->"+self.location.origin);
  console.log("orderAssign-->"+orderAssign);
  const urlToOpen = new URL(orderAssign, self.location.origin).href;
  console.log("urlToOpen-->"+urlToOpen);
  /**** END urlToOpen ****/

  /**** START clientsMatchAll ****/
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  /**** END clientsMatchAll ****/
  /**** START searchClients ****/
  .then((windowClients) => {
    let matchingClient = null;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient;
        break;
      }
    }

    if (matchingClient) {
      return matchingClient.focus();
    } else {
      return clients.openWindow(urlToOpen);
    }
  });
  /**** END searchClients ****/

  event.waitUntil(promiseChain);
  /**** END notificationFocusWindow ****/
}

function dataNotification(event) {
  /**** START printNotificationData ****/
  const notificationData = event.notification.data;
  console.log('');
  console.log('The data notification had the following parameters:');
  Object.keys(notificationData).forEach((key) => {
    console.log(`  ${key}: ${notificationData[key]}`);
  });
  console.log('');
  /**** END printNotificationData ****/
}

/**** START isClientFocused ****/
function isClientFocused() {
  return clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
    let clientIsFocused = false;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.focused) {
        clientIsFocused = true;
        break;
      }
    }

    return clientIsFocused;
  });
}
/**** END isClientFocused ****/

 /**** START notificationClickEvent ****/
 self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  focusWindow(event);
});