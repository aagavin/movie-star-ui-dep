import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCardContent } from "@ionic/react";
import { TextFieldTypes } from "@ionic/core";
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { providers, firebaseAppAuth } from "../../firebaseConfig";



interface SignupForm {
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string,
  phone?: string
}

const SignupPage: React.FC<any> = props => {

  const [signup, setSignup] = useState<SignupForm>({});
  const [errorMsg, setErrorMsg] = useState<string>('');

  const setItem = (event: any) => {
    signup[event.target.name] = event.target.value;
    if (signup.name === '') {
      setErrorMsg('name can\'t be blank');
    }
    else if (signup.password !== signup.passwordConfirm) {
      setErrorMsg('password and confirm password needs to match');
    }
    else {
      setSignup(signup);
      setErrorMsg('');
    }
  }

  const submitSignUpForm = async () => {
    try{
      const user = await props.createUserWithEmailAndPassword(signup.email, signup.password);
      console.log(user);
      firebase.auth().currentUser.sendEmailVerification();
      // await user.sendEmailVerification();
    }
    catch(err){
      console.error(err);
    }
  }

  const getItem = (text: string, name: string, type: TextFieldTypes = 'text', required: boolean = true) => (
    <IonItem>
      <IonLabel position="floating">{text} {required && '*'}</IonLabel>
      <IonInput type={type} name={name} required={required} onIonChange={setItem}></IonInput>
    </IonItem>
  );

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Create an Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCardContent>
          <p>* is required</p>
          {getItem('Name', 'name')}
          {getItem('Email', 'email', 'email')}
          {getItem('Password', 'password', 'password')}
          {getItem('Password Confirm', 'passwordConfirm', 'password')}
          {getItem('Phone number', 'phone', 'tel', false)}
          <IonButton expand="full" onClick={submitSignUpForm}>Create Account</IonButton>
          {errorMsg !== '' && (
            <IonItem>
              <p style={{ color: '#f00' }}>{errorMsg}</p>
            </IonItem>
          )}
        </IonCardContent>
      </IonContent>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(SignupPage);