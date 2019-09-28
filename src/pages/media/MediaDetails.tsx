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
  IonItem,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { share } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import UserContext from '../../context';
import { BASE_IMG, BASE_URL, MediaDetail, Season } from '../../declarations';

const { Modals, Share } = Plugins;

// tslint:disable: no-string-literal
// tslint:disable: no-console
// tslint:disable: jsx-no-lambda
const MidiaDetails: React.FC<any> = () => {

  const { history, match } = useReactRouter();
  const [result, setResult] = useState<MediaDetail>({});
  const [isFav, setIsFav] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showSeasons, setShowSeasons] = useState(false);

  const catogery = match.params['catogery'];
  const mediaId = match.params['mediaId'];
  const context = useContext<any>(UserContext);

  // eslint-disable-next-line
  useEffect(() => {
    const url = `${BASE_URL}/media/${catogery}/${mediaId}`;
    fetch(url).then(r => r.json()).then(setResult).catch(console.error);
    return () => setResult({});
  }, [mediaId, catogery])

  useEffect(() => {
    if (context.user && result && result.id) {
      setIsFav(context.favourites.some(f => f.id === result.id));
    }
    return () => setIsFav(false);
  }, [context.user, context.favourites, result, result.id]);

  const parseDate = (dateString: string): string => {
    const monthName = {
      1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
      7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec',
    }
    const d = new Date(dateString);
    return `${monthName[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  // TODO: 
  const shareBtnclick = async (e: MouseEvent) => {
    try {
      await Share.share({
        title: res.title,
        text: res.title,
        url: window.location.href,
        dialogTitle: 'share item'
      });
    }
    catch (err) {
      await Modals.alert({
        title: 'error',
        message: err
      });
    }


  }

  const addToFavourite = async (id: number) => {
    const fav = {};
    fav[id] = {
      id: result.id,
      name: result.name ? result.name : null,
      title: result.title ? result.title : null,
      poster_path: result.poster_path,
      media_type: catogery
    };
    await context.addFavourite(context.user.uid, fav);
    context.favourites.push(fav[id]);
    setIsFav(true);
    setShowToast(true);
  }

  const removeFromFavourite = async (id: number) => {
    await context.removeFavourite(context.user.uid, id);
    context.favourites = context.favourites.filter(f => f.id !== id);
    setIsFav(false);
    setShowToast(true);
  }

  const res = {
    ...result,
    title: result && result.title ? result.title : result.name,
    badge1: `raiting: ${result.vote_average}`
  };

  if (result && catogery === 'movie') {
    res['badge2'] = `runtime: ${res.runtime}`;
    res['badge3'] = parseDate(res.release_date);
  }
  else {

    res['badge2'] = res.next_episode_to_air ? `next episode: ${parseDate(res.next_episode_to_air.air_date)}` : '';
    if (typeof res.networks !== 'undefined') {
      const networkNames = res.networks.map(n => n.name);
      res['badge3'] = `Airs on: ${networkNames.join(', ')}`;
    }

  }

  const getSeaons = () => (
    result.seasons && result.seasons.map((season: Season) => (
      <IonCard key={season.id} id={`card-season-${season.id}`}>
        <IonCardHeader>
          <IonCardSubtitle><IonImg src={`${BASE_IMG}/w780${season.poster_path}`} /></IonCardSubtitle>
          <IonCardTitle>{season.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {season.overview}
          <br />
          <IonBadge color="light">{season.episode_count} episodes</IonBadge>
          <IonItem button detail onClick={e => history.push(`/home/media/${catogery}/${match.params['mediaId']}/season/${season.season_number}/episodes/${season.episode_count}`)}>
            <IonLabel>
              View Episodes
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
    ))
  );

  const getCard = () => {
    const removeFavClickHandler = () => removeFromFavourite(res.id);
    const addFavClickHandler = () => addToFavourite(res.id);
    const showSeasonsClickHandler = () => setShowSeasons(!showSeasons)
    return (
      <IonCard id={`card-${res.id}`}>
        <IonCardHeader>
          <IonCardSubtitle>
            <IonImg src={`${BASE_IMG}/w780${res.poster_path}`} alt={`poster for ${res.title}`} />
          </IonCardSubtitle>
          <IonCardTitle><b>{res.title}</b></IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {res.overview}
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
          </IonGrid>

          <IonGrid>
            {isFav ?
              <IonButton expand="block" color="danger" onClick={removeFavClickHandler} >Remove as favourite</IonButton> :
              (context.user && <IonButton expand="block" color="primary" onClick={addFavClickHandler}>Add to favourite</IonButton>)
            }
            {catogery === 'tv' && <IonButton expand="block" fill="clear" onClick={showSeasonsClickHandler}>{showSeasons ? 'Hide Seasons' : 'Show Seasons'}</IonButton>}
          </IonGrid>
        </IonCardContent>
      </IonCard>
    )
  };

  return (
    <IonPage>
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
        {res && res.title ? getCard() : <IonProgressBar type="indeterminate" />}
        {showSeasons && getSeaons()}
      </IonContent>
    </IonPage>
  );
};

export default MidiaDetails;
