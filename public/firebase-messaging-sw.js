
//importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');


firebase.initializeApp({
    apiKey: "AIzaSyAY3OpKsneJta4ZhxxXtWQ5VoUUegJgExs",
    authDomain: "livestream-aedbe.firebaseapp.com",
    projectId: "livestream-aedbe",
    storageBucket: "livestream-aedbe.appspot.com",
    messagingSenderId: "186355684536",
    appId: "1:186355684536:web:4fe8c375344829e2b7904d",
    measurementId: "G-NPCRLSPDC9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

