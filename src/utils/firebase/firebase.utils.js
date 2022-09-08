// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwLkRpXvemvuFYUnAvoVgH3pBDnUhG0_w",
    authDomain: "capstone-crwn.firebaseapp.com",
    projectId: "capstone-crwn",
    storageBucket: "capstone-crwn.appspot.com",
    messagingSenderId: "446466039937",
    appId: "1:446466039937:web:091cf5f71c56da8657ed80"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // this is to make sure that you get email and password
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    // this is to make sure that you get email and password
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)