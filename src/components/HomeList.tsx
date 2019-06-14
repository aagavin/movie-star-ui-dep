import { IonItem, IonLabel, IonList, IonThumbnail } from "@ionic/react";
import React from 'react';


class HomeList extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      movieResults: [],
      tvResults: []
    }
  }

  getResults(catogery: string) {
    fetch(`https://watch-tv-list.herokuapp.com/${catogery}/upcoming`)
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
          <IonItem key={result.id}>
            <IonThumbnail slot="start">
              <img src={`https://image.tmdb.org/t/p/w45${result.poster_path}`} />
            </IonThumbnail>
            <IonLabel>{this.props.catogery === 'movie' ? result.original_title : result.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }
}

export default HomeList;
