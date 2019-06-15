import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { BASE_IMG, BASE_URL } from "../declarations";

class MidiaDetails extends React.Component<any, any> {


  constructor(props: any) {
    super(props);
    this.state = {
      catogery: this.props.match.params.catogery,
      results: {}
    }
  }

  async componentDidMount() {
    const url = `${BASE_URL}/${this.state.catogery}/${this.props.match.params.mediaId}`;
    const response = await fetch(url);
    this.setState({ results: await response.json() })
  }

  render() {

    const catogery = this.state.catogery;
    const results = {
      ...this.state.results,
      title: this.state.results.name
    };

    return (
      <>
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
                <IonImg src={`${BASE_IMG}/w500${results.poster_path}`} />
              </IonCardSubtitle>
              <IonCardTitle>{results.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{results.overview}</IonCardContent>
          </IonCard>
        </IonContent>
      </>
    );
  }
}

export default withRouter(MidiaDetails)