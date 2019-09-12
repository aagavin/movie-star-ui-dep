import { TextFieldTypes } from '@ionic/core';
import { IonButton, IonButtons, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext, useState } from 'react';
import UserContext from '../../context';


interface SignupForm {
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string,
  phone?: string
}

const SignupPage: React.FC<any> = () => {

  const [signup, setSignup] = useState<SignupForm>({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const context = useContext<any>(UserContext);

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
      await context.createUserWithEmailAndPassword(signup.email, signup.password);
      firebase.auth().currentUser.sendEmailVerification();
      
    }
    catch(err){
      // tslint:disable-next-line: no-console
      console.error(err);
    }
  }

  const getItem = (text: string, name: string, type: TextFieldTypes = 'text', required: boolean = true) => (
    <IonItem>
      <IonLabel position="floating">{text} {required && '*'}</IonLabel>
      <IonInput type={type} name={name} required={required} onIonChange={setItem}/>
    </IonItem>
  );

  return (
    <IonPage>
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
    </IonPage>
  );
}

export default SignupPage;