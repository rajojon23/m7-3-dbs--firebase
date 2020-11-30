import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);



var firebaseConfig = {
  apiKey: "AIzaSyDiv4XyKYuzyzRZ1nG_cqmgCb0pncf9bT8",
  authDomain: "user-app-32315.firebaseapp.com",
  databaseURL: "https://user-app-32315.firebaseio.com",
  projectId: "user-app-32315",
  storageBucket: "user-app-32315.appspot.com",
  messagingSenderId: "437806588130",
  appId: "1:437806588130:web:15292560132b060952febb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


 const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

    const handleSignOut = () => {
         signOut();
         setAppUser({});
       };
     useEffect(() => {
       if (user){
        console.log(user);
              //  setAppUser({
              //      displayName: user.displayName,
              //      email: user.email,
              //      photoURL: user.photoURL,
              //    });
                   fetch(`/users`, {
                       method: 'post',
                       headers: {
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                         displayName: user.displayName,
                         email: user.email,
                         photoURL: user.photoURL,
                       }),
                     })
                       .then((res) => res.json())
                       .then((json) => {
                         setAppUser(json.data);
                         setMessage(json.message);
                       });

       } 

       
     }, [user]);


   return (
         <AppContext.Provider
           value={{ appUser, signInWithGoogle, handleSignOut, message }}
         >
         {children}
       </AppContext.Provider>
     );
};


 export default withFirebaseAuth({
   providers,
   firebaseAppAuth,
 })(AppProvider)
