import { IonButton, IonImg, IonItem, IonLabel, IonList, IonSpinner, IonThumbnail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import VisibilitySensor from 'react-visibility-sensor';

interface ResultsListProps {
  catogery?: string,
  history?: any,
  location?: any,
  match?: any,
  results: [],
  staticContext?: any
}

const ResultsList: React.FC<any> = (props: ResultsListProps) => {

  const [index, setIndex] = useState<number>(30);
  const [results, setResults] = useState(props.results.slice(0, index));

  useEffect(() => {
    setResults(props.results.slice(0, index));
  }, [props.results, index]);

  const next = visible => {
    if (visible) {
      const nextIndex = index + 10;
      setResults(props.results.slice(0, nextIndex));    
      setIndex(index + 10); 
    }

  };

  const getLoading = () => {
    if (props.results.length > 50 && results.length !== props.results.length) {
      return (
        <VisibilitySensor partialVisibility intervalDelay={50} offset={{top:10}} onChange={next}>
          <IonButton onClick={next} fill="clear" expand="block">
            <IonSpinner />
          </IonButton>
        </VisibilitySensor>
      )
    }
    return <></>;
  }


  return (
    <>
      <IonList id={`result-list-${props.catogery}`}>
        {results.map((result: any) => (
          <IonItem detail button key={result.id} onClick={e => props.history.push(`/home/media/${result.titleType}/${result.id}`)}>
            <IonThumbnail slot="start">
              <IonImg src={result.image.url} alt={`poster icon for ${result.title}`} />
            </IonThumbnail>
            <IonLabel class="ion-text-wrap">{result.title}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      {getLoading()}
    </>
  )
};

export default withRouter(ResultsList);