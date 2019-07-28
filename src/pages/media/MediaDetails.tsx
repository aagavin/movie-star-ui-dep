import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar, IonButton, IonBadge, IonGrid, IonRow, IonCol, IonToast, IonIcon, IonItem, IonLabel, IonProgressBar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import useReactRouter from 'use-react-router';
import { providers, firebaseAppAuth } from "../../firebaseConfig";
import { BASE_IMG, BASE_URL, MediaDetail } from "../../declarations";

const MidiaDetails: React.FC<any> = (props: any) => {

  const { history, match } = useReactRouter();
  const [result, setResult] = useState<MediaDetail>({});
  const [isFav, setIsFav] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showSeasons, setShowSeasons] = useState(false);
  const [catogery] = useState(match.params['catogery']);

  useEffect(() => {
    const url = `${BASE_URL}/media/${catogery}/${match.params['mediaId']}`;
    fetch(url).then(r => r.json()).then(setResult).catch(console.error);
    return () => setResult({});
  }, [catogery, match.params]);

  useEffect(() => {
    if (props.user && result && result.id) {
      firebase.firestore().collection('favs').doc(props.user.uid).get().then(doc => {
        const favs = Object.keys(doc.data());
        setIsFav(favs.includes(result.id.toString()));
      });
    }
  }, [props.user, result]);

  const addToFavourite = async (id: number) => {
    const fav = {};
    fav[id] = {
      id: result.id,
      name: result.name ? result.name : null,
      title: result.title ? result.title: null,
      poster_path: result.poster_path,
      media_type: catogery
    };
    await firebase.firestore().collection('favs').doc(props.user.uid).set(fav, { merge: true });
    setIsFav(true);
    setShowToast(true);
  }

  const removeFromFavourite = async (id: number) => {
    const delFav = {};
    delFav[id] = firebase.firestore.FieldValue.delete();
    await firebase.firestore().collection('favs').doc(props.user.uid).update(delFav);
    setIsFav(false);
    setShowToast(true);
  }

  const getSeaons = () => {
    return result.seasons.map((season: any) => (
      <IonCard key={season.id}>
        <IonCardHeader>
          <IonCardSubtitle><IonImg src={`${BASE_IMG}/w780${season.poster_path}`} /></IonCardSubtitle>
          <IonCardTitle>{season.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {season.overview}
          <br />
          <IonBadge color="light">{season.episode_count} episodes</IonBadge>

          <IonItem button detail onClick={() => history.push(`/home/media/${catogery}/${match.params['mediaId']}/season/${season.season_number}/episodes/${season.episode_count}`)}>
            <IonLabel>
              View Episodes
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
    ));
  };

  const getCard = () => (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          <img src={`${BASE_IMG}/w780${res.poster_path}`} alt={`poster for ${res.title}`} />
        </IonCardSubtitle>
        <IonCardTitle><b>{res.title}</b></IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{res.overview}</IonCardContent>
      <IonCardContent>
        <IonGrid align-items-start>
          <IonRow>
            <IonCol size="auto">
              <IonBadge color="light">{res.badge1}</IonBadge>
            </IonCol>
            <IonCol size="auto">
              <IonBadge color="light">{res.badge2}</IonBadge>
            </IonCol>
            <IonCol size="auto">
              <IonBadge color="light">{res.badge3}</IonBadge>
            </IonCol>
          </IonRow>
          {isFav ?
            <IonButton expand="block" color="danger" onClick={e => removeFromFavourite(res.id)} >Remove as favourite</IonButton> :
            (props.user && <IonButton expand="block" color="primary" onClick={e => addToFavourite(res.id)}>Add to favourite</IonButton>)
          }
        </IonGrid>
      </IonCardContent>
      <IonCardContent>
        {catogery === 'tv' && <IonButton expand="full" fill="clear" onClick={e => setShowSeasons(!showSeasons)}>{showSeasons ? 'Hide Seasons' : 'Show Seasons'}</IonButton>}
      </IonCardContent>
    </IonCard>
  );


  const res = {
    ...result,
    title: result && result.title ? result.title : result.name,
    badge1: `raiting: ${result.vote_average}`
  };

  if (catogery === 'movie') {
    res['badge2'] = `runtime: ${res.runtime}`;
    res['badge3'] = res.release_date;
  }
  else {
    res['badge2'] = res.next_episode_to_air ? `next episode: ${res.next_episode_to_air.air_date}` : '';
    res['badge3'] = '';
  }


  return (
    <>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={isFav ? 'added to favourites' : 'removed from favourites'}
        duration={200}
      >
      </IonToast>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton routerDirection="back" onClick={history.goBack}>
              <IonIcon name="arrow-back"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{catogery}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {Object.keys(result).length !== 0 ? getCard() : <IonProgressBar type="indeterminate" />}
        {showSeasons && getSeaons()}
      </IonContent>
    </>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(MidiaDetails);
