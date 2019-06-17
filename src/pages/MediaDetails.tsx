import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar, IonButton, IonBadge, IonGrid, IonRow, IonCol, IonToast, IonIcon, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { BASE_IMG, BASE_URL } from "../declarations";

class MidiaDetails extends React.Component<any, any> {


  constructor(props: any) {
    super(props);
    this.state = {
      catogery: this.props.match.params.catogery,
      result: {},
      showToast: false,
      showSeasons: false
    }
  }

  async componentDidMount() {
    const url = `${BASE_URL}/${this.state.catogery}/${this.props.match.params.mediaId}`;
    const response = await fetch(url);
    this.setState({ result: await response.json() })
  }

  async addToFavourite() {
    this.setState({ showToast: true });
  }

  getSeaons() {
    return this.state.result.seasons.map((season: any) => (
      <IonCard key={season.id}>
        <IonCardHeader>
          <IonCardSubtitle><IonImg src={`${BASE_IMG}/w500${season.poster_path}`} /></IonCardSubtitle>
          <IonCardTitle>{season.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {season.overview}
          <br />
          <IonBadge color="light">{season.episode_count} episodes</IonBadge>

          <IonItem button detail>
            <IonLabel>
              View Episodes
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
    ));
  }

  render() {

    const catogery = this.state.catogery;
    const result = {
      ...this.state.result,
      title: this.state.result.title ? this.state.result.title : this.state.result.name,
      badge1: `raiting: ${this.state.result.vote_average}`
    };

    if (this.state.catogery === 'movie') {
      result['badge2'] = `runtime: ${result.runtime}`;
      result['badge3'] = result.release_date;
    }
    else {
      result['badge2'] = result.next_episode_to_air ? `next episode: ${result.next_episode_to_air.air_date}` : '';
      result['badge3'] = '';
    }

    return (
      <>
        <IonToast
          isOpen={this.state.showToast}
          onDidDismiss={() => this.setState(() => ({ showToast: false }))}
          message='Your settings have been saved.'
          duration={200}
        >
        </IonToast>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton routerDirection="back" onClick={this.props.history.goBack}>
                <IonIcon name="arrow-back"></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>{catogery}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>
                <img src={`${BASE_IMG}/w500${result.poster_path}`} />
              </IonCardSubtitle>
              <IonCardTitle><b>{result.title}</b></IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{result.overview}</IonCardContent>
            <IonCardContent>
              <IonGrid align-items-start>
                <IonRow>
                  <IonCol size="auto">
                    <IonBadge color="light">{result.badge1}</IonBadge>
                  </IonCol>
                  <IonCol size="auto">
                    <IonBadge color="light">{result.badge2}</IonBadge>
                  </IonCol>
                  <IonCol size="auto">
                    <IonBadge color="light">{result.badge3}</IonBadge>
                  </IonCol>
                </IonRow>
                <IonButton expand="block" color="primary" onClick={e => this.addToFavourite()}>Add to favourite</IonButton>
              </IonGrid>

            </IonCardContent>
            <IonCardContent>
              {catogery === 'tv' ? (
                <IonButton expand="full" fill="clear" onClick={e => this.setState({ showSeasons: !this.state.showSeasons })}>Show Seasons</IonButton>
              ) : ''}
            </IonCardContent>
          </IonCard>

          {this.state.showSeasons ? this.getSeaons() : ''}
        </IonContent>
      </>
    );
  }
}

export default withRouter(MidiaDetails)