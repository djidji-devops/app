importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDOVltUVCGUz3XtZq4sdjtRbMG7sSp9bM8",
  authDomain: "proba-9781f.firebaseapp.com",
  projectId: "proba-9781f",
  storageBucket: "proba-9781f.firebasestorage.app",
  messagingSenderId: "945092131490",
  appId: "1:945092131490:web:8fcbe9a339927fe822f5fb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(
    payload.notification?.title || 'FRIGO-NIDŽA',
    {
      body: payload.notification?.body || '',
      icon: '/logo.png',
      badge: '/logo.png',
      tag: 'frigo-nalog',
      renotify: true,
      vibrate: [200, 100, 200]
    }
  );
});
