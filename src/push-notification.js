if ('serviceWorker' in navigator) {
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('../firebase-messaging-sw.js')
      //navigator.serviceWorker.register('../eatadmin/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    });
}