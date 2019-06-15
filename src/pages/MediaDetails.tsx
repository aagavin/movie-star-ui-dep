import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar, IonButton, IonBadge, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { BASE_IMG, BASE_URL } from "../declarations";

class MidiaDetails extends React.Component<any, any> {


  constructor(props: any) {
    super(props);
    this.state = {
      catogery: this.props.match.params.catogery,
      result: {},
      showToast: false
    }
  }

  async componentDidMount() {
    const url = `${BASE_URL}/${this.state.catogery}/${this.props.match.params.mediaId}`;
    const response = await fetch(url);
    this.setState({ result: await response.json() })
  }

  async addToFavourite() {
    this.setState({showToast: true});
  }

  render() {

    const catogery = this.state.catogery;
    const result = {
      ...this.state.result,
      title: this.state.result.title ? this.state.result.title : this.state.result.name
    };

    console.log(result);

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
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton goBack={() => { }} defaultHref="/" />
            </IonButtons>
            <IonTitle>{catogery}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>
                <IonImg src={`${BASE_IMG}/w500${result.poster_path}`} />
              </IonCardSubtitle>
              <IonCardTitle>{result.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{result.overview}</IonCardContent>
            <IonCardContent>
              <IonGrid align-items-start>
                <IonRow>
                  <IonCol size="auto">
                    <IonBadge color="light">raiting: {result.vote_average}</IonBadge>
                  </IonCol>
                  <IonCol size="auto">
                    <IonBadge color="light">runtime: {result.runtime}</IonBadge>
                  </IonCol>
                  <IonCol size="auto">
                    <IonBadge color="light">{result.release_date}</IonBadge>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
            <IonCardContent>
              <IonButton expand="block" color="primary" onClick={e => this.addToFavourite()}>Add to favourite</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </>
    );
  }
}

export default withRouter(MidiaDetails)