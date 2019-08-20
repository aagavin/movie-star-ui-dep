import { IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonProgressBar, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import UserContext from '../../context';
import { BASE_IMG, BASE_URL, MediaDetail, Season } from '../../declarations';

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
  const context = useContext<any>(UserContext);

  useEffect(() => {
    const url = `${BASE_URL}/media/${catogery}/${match.params['mediaId']}`;
    fetch(url).then(r => r.json()).then(setResult).catch(console.error);
    return () => setResult({});
  }, [match.params, catogery])

  useEffect(() => {
    if (context.user && result && result.id) {
      setIsFav(context.favourites.some(f => f.id === result.id));
    }
    return () => setIsFav(false);
  }, [context.user, context.favourites, result, result.id]);

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

  const getSeaons = () => (
    result.seasons.map((season: Season) => (
      <IonCard key={season.id}>
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
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>
            <IonImg src={`${BASE_IMG}/w780${res.poster_path}`} alt={`poster for ${res.title}`} />
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
              <IonButton expand="block" color="danger" onClick={removeFavClickHandler} >Remove as favourite</IonButton> :
              (context.user && <IonButton expand="block" color="primary" onClick={addFavClickHandler}>Add to favourite</IonButton>)
            }
          </IonGrid>
        </IonCardContent>
        <IonCardContent>
          {catogery === 'tv' && <IonButton expand="full" fill="clear" onClick={showSeasonsClickHandler}>{showSeasons ? 'Hide Seasons' : 'Show Seasons'}</IonButton>}
        </IonCardContent>
      </IonCard>
    )
  };


  const res = {
    ...result,
    title: result && result.title ? result.title : result.name,
    badge1: `raiting: ${result.vote_average}`
  };

  if (result && catogery === 'movie') {
    res['badge2'] = `runtime: ${res.runtime}`;
    res['badge3'] = res.release_date;
  }
  else {

    res['badge2'] = res.next_episode_to_air ? `next episode: ${res.next_episode_to_air.air_date}` : '';
    if(typeof res.networks !== 'undefined'){
      const networkNames = res.networks.map(n => n.name);
      res['badge3'] = `Airs on: ${networkNames.join(', ')}`;
    }
    
  }

  return (
    <>
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
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {res && res.title ? getCard() : <IonProgressBar type="indeterminate" />}
        {showSeasons && getSeaons()}
      </IonContent>
    </>
  );
};

export default MidiaDetails;
