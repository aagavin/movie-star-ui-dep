export const BASE_URL = 'https://watch-tv-list.herokuapp.com';
export const BASE_IMG = 'https://image.tmdb.org/t/p';

export interface AppPage {
  url: string;
  icon: object;
  title: string;
}


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

export interface MediaDetail {
  adult?: boolean;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  genres?: Genre[];
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
  seasons?: [];
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
