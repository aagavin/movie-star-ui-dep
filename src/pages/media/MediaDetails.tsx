import { Plugins } from '@capacitor/core';
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { share } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import useReactRouter from 'use-react-router';
import UserContext from '../../context';
import { BASE_IMG, BASE_URL, MediaDetail } from '../../declarations';

const { Modals, Share } = Plugins;

// tslint:disable: no-string-literal
// tslint:disable: no-console
// tslint:disable: jsx-no-lambda
const MediaDetails: React.FC<any> = () => {

  const { match } = useReactRouter();
  const [result, setResult] = useState<MediaDetail>({});
  const [isFav, setIsFav] = useState<boolean>(false);
  const [tvReleaseDate, setTvReleaseDate] = useState<string>();
  const [showToast, setShowToast] = useState<boolean>(false);

  const catogery = match.params['catogery'];
  const mediaId = match.params['mediaId'];
  const context = useContext<any>(UserContext);

  const getMediaById = (id: string) => fetch(`${BASE_URL}/media/${catogery}/${id}`)
    .then(async r => await r.json())
    .catch(console.error);

  useEffect(() => {
    getMediaById(mediaId).then(setResult);
    return () => setResult({});
  }, [mediaId, catogery])

  useEffect(() => {
    if (context.user && result && result.id) {
      setIsFav(context.favourites.some(f => f.id === result.id));
    }
    return () => setIsFav(false);
  }, [context.user, context.favourites, result, result.id]);

  useEffect(() => {
    if (catogery && catogery !== 'movie' && Object.entries(result).length !== 0) {
      const id = result.nextEpisode.split('/')[2];
      getMediaById(id).then((r: MediaDetail) => setTvReleaseDate(parseDate(r.releaseDetails.date)));
    }
  }, [result, catogery])


  const parseDate = (dateString: string): string => {
    const monthName = {
      0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
      6: 'Jul', 7: 'Aug', 8: 'Sept', 9: 'Oct', 10: 'Nov', 11: 'Dec',
    }
    const d = new Date(dateString);
    return `${monthName[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  const timeConvert = (n: any) => {
    const hours = (n / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'min';
  }

  // TODO: 
  const shareBtnclick = e => {
    try {
      Share.share({
        title: result.title,
        text: result.title,
        url: window.location.href,
        dialogTitle: 'share item'
      }).then(console.log).catch(console.error);
    }
    catch (err) {
      Modals.alert({
        title: 'error',
        message: err
      }).then(console.log).catch(console.error);;
    }


  }

  const addToFavourite = async (id: string) => {
    const fav = {};
    fav[id] = {
      id: result.id,
      title: result.title ? result.title : null,
      poster_url: result.image.url,
      media_type: catogery
    };
    await context.addFavourite(context.user.uid, fav);
    context.favourites.push(fav[id]);
    setIsFav(true);
    setShowToast(true);
  }

  const removeFromFavourite = async (id: string) => {
    await context.removeFavourite(context.user.uid, id);
    context.favourites = context.favourites.filter(f => f.id !== id);
    setIsFav(false);
    setShowToast(true);
  }

  if (Object.entries(result).length === 0) {
    return <IonProgressBar type="indeterminate" />
  }


  if (result && catogery === 'movie') {
    result['badge1'] = `rating: ${result?.metacriticInfo?.metaScore}%`;
    result['badge2'] = timeConvert(result.runningTimeInMinutes);
    result['badge3'] = parseDate(result.releaseDetails.date);
  }
  else {
    result['badge1'] = `imdb rating: ${result?.rating}`;
    result['badge2'] = `~${result.runningTimes[0].timeMinutes}min`;
    result['badge3'] = `next episode: ${tvReleaseDate}`
  }


  const getCard = () => {
    const removeFavClickHandler = () => removeFromFavourite(result.id);
    const addFavClickHandler = () => addToFavourite(result.id);
    return (
      <IonCard id={`card-${result.id}`}>
        <IonCardHeader>
          <IonCardSubtitle>
            <IonImg src={result.image.url} alt={`poster for ${result.title}`} />
          </IonCardSubtitle>
          <IonCardTitle><b>{result.title}</b></IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {result.plot.outline.text}
          <IonGrid align-items-start>
            <IonRow>
              <IonCol size="auto">
                <IonBadge color="light">{result.badge1}</IonBadge>
              </IonCol>
              <IonCol size="auto">
                <IonBadge color="light">{result.badge2}</IonBadge>
              </IonCol>
              <IonCol size="auto">
                <IonBadge color="light">{result?.badge3}</IonBadge>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonGrid>
            {isFav ?
              <IonButton expand="block" color="danger" onClick={removeFavClickHandler} >Remove as favourite</IonButton> :
              (context.user && <IonButton expand="block" color="primary" onClick={addFavClickHandler}>Add to favourite</IonButton>)
            }
          </IonGrid>
        </IonCardContent>
      </IonCard>
    )
  };

  return (
    <IonPage>
      <Helmet>
        <meta name="Description" content={result.plot.outline.text} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={result.title} />
        <meta property="og:description" content={result.plot.outline.text} />
        <meta property="og:image" content={`${BASE_IMG}/w780${result.image.url}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={window.location.href} />
        <meta name="twitter:title" content={result.title} />
        <meta name="twitter:description" content={result.plot.outline.text} />
        <meta name="twitter:image" content={`${BASE_IMG}/w780${result.image.url}`} />
        <title>{`Movie Star - ${result.title}`}</title>
      </Helmet>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={isFav ? 'added to favourites' : 'removed from favourites'}
        duration={200}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{catogery}</IonTitle>
          <IonButtons slot="end">
            <IonButton size="small" slot="end" onClick={shareBtnclick}>
              <IonIcon slot="icon-only" icon={share} />
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent>
        {result && result.title ? getCard() : <IonProgressBar type="indeterminate" />}
      </IonContent>
    </IonPage>
  );
};

export default MediaDetails;
