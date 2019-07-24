import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCardContent } from "@ionic/react";
import { TextFieldTypes } from "@ionic/core";
import { BASE_URL } from "../../declarations";


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
    else{
    setSignup(signup);
    }
  }

  const submitSignUpForm = async () => {
    const url = `${BASE_URL}/user/create`;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signup)
    }).then(r => r.json());
    if (response && response.name) {
      setErrorMsg('');
      console.log('success!');
    }
    else {
      switch (response.error.message) {
        case 'EMAIL_EXISTS':
          setErrorMsg('Email already exists ');
          break;
        default:
          setErrorMsg(response.error.message);
          break;
      }
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

export default SignupPage;