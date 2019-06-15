import { IonItem, IonLabel, IonList, IonThumbnail } from "@ionic/react";
import { BASE_URL, BASE_IMG } from "../declarations";
import React from 'react';
import { withRouter } from "react-router";


class HomeList extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      movieResults: [],
      tvResults: []
    }
  }

  getResults(catogery: string) {
    fetch(`${BASE_URL}/${catogery}/upcoming`)
      .then(res => res.json())
      .then(res => {
        const newState: any = {};
        newState[`${catogery}Results`] = res;
        this.setState(newState);
      });
  }

  async componentDidMount() {
    Promise.all([
      this.getResults('movie'),
      this.getResults('tv')
    ]);
  }

  render() {
    const results = this.state[`${this.props.catogery}Results`];
    return (
      <IonList>
        {results.map((result: any) => (
          <IonItem button key={result.id} onClick={e => {e.preventDefault(); this.props.history.push(`/home/media/${this.props.catogery}/${result.id}`)}}>
            <IonThumbnail slot="start">
              <img src={`${BASE_IMG}/w45${result.poster_path}`} />
            </IonThumbnail>
            <IonLabel>{this.props.catogery === 'movie' ? result.original_title : result.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }
}

export default withRouter(HomeList);
