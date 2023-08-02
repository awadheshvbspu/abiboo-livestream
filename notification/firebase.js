import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAY3OpKsneJta4ZhxxXtWQ5VoUUegJgExs",
    authDomain: "livestream-aedbe.firebaseapp.com",
    projectId: "livestream-aedbe",
    storageBucket: "livestream-aedbe.appspot.com",
    messagingSenderId: "186355684536",
    appId: "1:186355684536:web:4fe8c375344829e2b7904d",
    measurementId: "G-NPCRLSPDC9"
  };

// console.log('*** Environment ***', process.env.REACT_APP_ENV)
// console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
console.log("meaadge:",messaging);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: 'BADRo46Vru5KKlyh_AdUG02-OUsQlpdeXtRjokK6dE9WrRlPNl0sR8604kVJND-BuDa_SBskVSR2qR-WMZqAOj8', serviceWorkerRegistration }));
//  console.log(getFirebaseToken)
export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
