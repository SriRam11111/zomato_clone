/* eslint-disable prettier/prettier */
import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAIBtycWSGTQ0_MD9ZzLk46qOVc_iSGq14',
  authDomain: 'zomatoclone-5cd46.firebaseapp.com',
  databaseURL: 'https://zomatoclone-5cd46-default-rtdb.firebaseio.com',
  projectId: 'zomatoclone-5cd46',
  storageBucket: 'zomatoclone-5cd46.appspot.com',
  messagingSenderId: '672171978166',
  appId: '1:672171978166:web:65f8237f33465b1c8ea517',
  measurementId: 'G-XJQL39VSB8',
};

console.log(firebase);
firebase.initializeApp(firebaseConfig);

// if (firebase.apps.length === 0) {
//     firebase.initializeApp(firebaseConfig);
// }

const db = getDatabase();


export {db};

