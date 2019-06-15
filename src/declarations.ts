export interface AppPage {
  url: string,
  icon: string,
  title: string
}

export interface ListItem {
  title: string;
  note: string;
  icon: string;
}

export const BASE_URL = 'https://watch-tv-list.herokuapp.com';
export const BASE_IMG = 'https://image.tmdb.org/t/p';