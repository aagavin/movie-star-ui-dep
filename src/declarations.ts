export const BASE_URL = 'https://watch-tv-list.herokuapp.com';
export const BASE_IMG = 'https://image.tmdb.org/t/p';

/***** AppPage *****/ 
export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

/***** Settings *****/ 
export interface UserSettings {
  publicFav?: boolean
}

/***** MediaDetail *****/ 
interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Nextwork {
  id: number,
  name: string,
  logo_path: string,
  origin_country: string,
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

interface NextEpisodeToAir {
  air_date: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface MediaDetail {
  adult?: boolean;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  genres?: Genre[];
  networks?: Nextwork[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  name?: string;
  next_episode_to_air?: NextEpisodeToAir;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  seasons?: Season[];
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
