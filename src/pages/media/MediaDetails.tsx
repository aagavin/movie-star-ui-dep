import { Plugins, DeviceInfo } from '@capacitor/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { share } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import useReactRouter from 'use-react-router';
import MediaDetailsCard from "../../components/MediaDetailsCard";
import UserContext from '../../context';
import { BASE_IMG, BASE_URL, MediaDetail } from '../../declarations';
import useWindowSize from '../../hooks/useWindowSize';

const { Device, Share } = Plugins;

const MediaDetails: React.FC<any> = () => {

  const { match } = useReactRouter();
  const [result, setResult] = useState<MediaDetail>({});
  const [isFav, setIsFav] = useState<boolean>(false);
  const [tvReleaseDate] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const catogery = match.params['catogery'];
  const mediaId = match.params['mediaId'];
  const context = useContext<any>(UserContext);
  const screenSize = useWindowSize();


  const getMediaById = (id: string) => fetch(`${BASE_URL}/media/${catogery}/${id}`)
    .then(async r => await r.json())
    .catch(console.error);

  useEffect(() => {
    Device.getInfo().then((info: DeviceInfo) => {
      setIsMobile(info.platform !== 'web')
    });
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getMediaById(mediaId).then(setResult);
    return () => setResult({});
  }, [mediaId])
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (context.user && result && result.id) {
      setIsFav(context.favourites.some(f => f.id === result.id));
    }
    return () => setIsFav(false);
  }, [context.user, context.favourites, result, result.id]);

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

  const shareBtnclick = () => {
    Share.share({
      title: result.title,
      text: result.title,
      url: `https://movie.aagavin.ca${window.location.pathname}/`,
      dialogTitle: 'share item'
    }).then(console.log).catch(console.error);
  }

  const addToFavourite = async (id: string) => {
    const fav = {};
    fav[id] = {
      id: result.id,
      title: result.title,
      image: {
        url: result.image.url
      },
      titleType: catogery
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
    return (
      <IonPage>
        <IonHeader />
        <IonContent>
          <IonProgressBar type="indeterminate" />
        </IonContent>
      </IonPage>
    )
  }


  if (result && (catogery === 'feature' || catogery === 'movie')) {
    result['badge1'] = `rating: ${result?.metacriticInfo?.metaScore}%`;
    result['badge2'] = timeConvert(result.runningTimeInMinutes);
    result['badge3'] = parseDate(result.releaseDetails.date);
  }
  else {
    result['badge1'] = `imdb rating: ${result?.rating}`;
    result['badge2'] = `~${result.runningTimes[0].timeMinutes}min`;
    result['badge3'] = `next episode: ${tvReleaseDate}`
  }

  const summary = Object.keys(result.plot).includes('outline') ? result.plot.outline.text : result.plot.summaries[0].text;

  return (
    <IonPage>
      <Helmet>
        <meta name="Description" content={summary} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={result.title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={`${BASE_IMG}/w780${result.image.url}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={window.location.href} />
        <meta name="twitter:title" content={result.title} />
        <meta name="twitter:description" content={summary} />
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

          {
            isMobile && (
              <IonButtons slot="end">
                <IonButton size="small" slot="end" onClick={shareBtnclick}>
                  <IonIcon slot="icon-only" icon={share} />
                </IonButton>
              </IonButtons>)
          }


        </IonToolbar>
      </IonHeader>
      <IonContent>
        {result && result.title ? <MediaDetailsCard removeFromFavourite={removeFromFavourite} addToFavourite={addToFavourite} result={result} screenSize={screenSize} summary={summary} isFav={isFav} context={context} /> : <IonProgressBar type="indeterminate" />}
      </IonContent>
    </IonPage>
  );
};

export default MediaDetails;
