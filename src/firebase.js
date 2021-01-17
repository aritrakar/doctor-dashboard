import firebase from "firebase";
//import firestore from "firebase/firestore";
//import auth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAr7gccqZCVryTETJsCW4FNsCQt0yanhl8",
  authDomain: "docdash-b62ae.firebaseapp.com",
  projectId: "docdash-b62ae",
  storageBucket: "docdash-b62ae.appspot.com",
  messagingSenderId: "456153149350",
  appId: "1:456153149350:web:229b6213219190343b2967",
};

firebase.initializeApp(firebaseConfig);
//const fstore = firebase.firestore();
//const fauth = firebase.auth();

//export var storage = firebase.storage();

export default firebase;
