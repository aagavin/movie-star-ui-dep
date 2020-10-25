export const BASE_URL = 'https://watch-tv-list.herokuapp.com';
export const BASE_IMG = 'https://image.tmdb.org/t/p';

/***** AppPage *****/ 
export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

/***** Settings *****/ 
export interface UserSettings {
  publicFav?: boolean;
}

/***** MediaDetail *****/ 

export interface Certificate {
  certificate: string;
  certificateNumber: number;
  ratingReason: string;
  ratingsBody: string;
  country: string;
}

export interface InterestingVotes {
  up: number;
}

export interface FilmingLocation {
  extras: string[];
  id: string;
  interestingVotes: InterestingVotes;
  location: string;
}

export interface MetacriticInfo {
  metaScore: number;
  metacriticUrl: string;
  reviewCount: number;
  userRatingCount: number;
  userScore: number;
}

export interface Outline {
  author: string;
  id: string;
  text: string;
}

export interface Summary {
  id: string;
  text: string;
}

export interface Plot {
  outline?: Outline;
  summaries?: [Summary];
  totalSummaries: number;
}

export interface Role {
  character: string;
  characterId: string;
}

export interface Image {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface Principal {
  disambiguation: string;
  id: string;
  legacyNameText: string;
  name: string;
  attr: string[];
  billing: number;
  category: string;
  characters: string[];
  roles: Role[];
  image: Image;
}

export interface TopRank {
  rankType: string;
  rank: number;
}

export interface RunningTime {
  timeMinutes: number;
}

export interface ReleaseDetails {
  date: string;
  premiere: boolean;
  region: string;
  wide: boolean;
}

export interface Image2 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface RelatedName {
  akas: string[];
  id: string;
  image: Image2;
  legacyNameText: string;
  name: string;
}

export interface Soundtrack {
  comment: string;
  id: string;
  name: string;
  relatedNames: RelatedName[];
}

export interface Author {
  displayName: string;
  userId: string;
}

export interface InterestingVotes2 {
  down: number;
  up: number;
}

export interface ReviewsTeaser {
  author: Author;
  authorRating: number;
  helpfulnessScore: number;
  id: string;
  interestingVotes: InterestingVotes2;
  languageCode: string;
  reviewText: string;
  reviewTitle: string;
  spoiler: boolean;
  submissionDate: string;
  titleId: string;
}

export interface InterestingVotes3 {
  down: number;
  up: number;
}

export interface CrazyCreditsTeaser {
  id: string;
  interestingVotes: InterestingVotes3;
  text: string;
}

export interface AwardsSummary {
  otherNominationsCount: number;
  otherWinsCount: number;
}

export interface Awards {
  awardsSummary: AwardsSummary;
  highlightedCategory?: any;
}

export interface Image3 {
  caption: string;
  createdOn: Date;
  height: number;
  id: string;
  url: string;
  width: number;
  relatedNamesIds: string[];
  relatedTitlesIds: string[];
  source: string;
  type: string;
}

export interface Photos {
  images: Image3[];
  totalImageCount: number;
}

export interface HeroImage {
  attribution: string;
  caption: string;
  copyright: string;
  createdOn: Date;
  height: number;
  id: string;
  url: string;
  width: number;
  source: string;
  type: string;
}

export interface ProductionStatus {
  comment: string;
  date: string;
  status: string;
}

export interface Image4 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface Director {
  akas: string[];
  id: string;
  image: Image4;
  legacyNameText: string;
  name: string;
  category: string;
}

export interface Image5 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface Writer {
  akas: string[];
  id: string;
  image: Image5;
  legacyNameText: string;
  name: string;
  category: string;
  job: string;
  writerCategoryBilling: number;
  writerTeamBilling: number;
  disambiguation: string;
}

export interface Encoding {
  definition: string;
  heightPixels: number;
  mimeType: string;
  play: string;
  videoCodec: string;
  widthPixels: number;
}

export interface Image6 {
  height: number;
  url: string;
  width: number;
}

export interface Image7 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface PrimaryTitle {
  id: string;
  image: Image7;
  title: string;
  titleType: string;
  year: number;
}

export interface MainTrailer {
  contentType: string;
  description: string;
  durationSeconds: number;
  encodings: Encoding[];
  id: string;
  image: Image6;
  monetization: string;
  primaryTitle: PrimaryTitle;
  videoTitle: string;
}

export interface Encoding2 {
  definition: string;
  heightPixels: number;
  mimeType: string;
  play: string;
  videoCodec: string;
  widthPixels: number;
}

export interface Image8 {
  height: number;
  url: string;
  width: number;
}

export interface Image9 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface PrimaryTitle2 {
  id: string;
  image: Image9;
  title: string;
  titleType: string;
  year: number;
}

export interface HeroVideo {
  contentType: string;
  description: string;
  durationSeconds: number;
  encodings: Encoding2[];
  id: string;
  image: Image8;
  monetization: string;
  primaryTitle: PrimaryTitle2;
  videoTitle: string;
}

export interface Encoding3 {
  definition: string;
  heightPixels: number;
  mimeType: string;
  play: string;
  videoCodec: string;
  widthPixels: number;
}

export interface Image10 {
  height: number;
  url: string;
  width: number;
}

export interface Image11 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface PrimaryTitle3 {
  id: string;
  image: Image11;
  title: string;
  titleType: string;
  year: number;
}

export interface OtherVideo {
  contentType: string;
  durationSeconds: number;
  encodings: Encoding3[];
  id: string;
  image: Image10;
  monetization: string;
  primaryTitle: PrimaryTitle3;
  videoTitle: string;
}

export interface Videos {
  totalVideoCount: number;
  mainTrailer: MainTrailer;
  heroVideos: HeroVideo[];
  otherVideos: OtherVideo[];
}

export interface Image12 {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface SeasonsInfo {
  season: number;
}

export interface MediaDetail {
  badge1?: string;
  badge2?: string | number;
  badge3?: string;
  certificate?: Certificate;
  filmingLocations?: FilmingLocation[];
  metacriticInfo?: MetacriticInfo;
  plot?: Plot;
  principals?: Principal[];
  rating?: number;
  numberOfVotes?: number;
  canRate?: boolean;
  topRank?: TopRank;
  userRating?: any;
  alternateTitlesSample?: string[];
  alternateTitlesCount?: number;
  hasAlternateVersions?: boolean;
  originalTitle?: string;
  runningTimes?: RunningTime[];
  spokenLanguages?: string[];
  origins?: string[];
  similaritiesCount?: number;
  releaseDetails?: ReleaseDetails;
  soundtracks?: Soundtrack[];
  genres?: string[];
  reviewsTeaser?: ReviewsTeaser;
  reviewsCount?: number;
  hasContentGuide?: boolean;
  hasSynopsis?: boolean;
  hasCriticsReviews?: boolean;
  criticsReviewers?: string[];
  crazyCreditsTeaser?: CrazyCreditsTeaser;
  awards?: Awards;
  photos?: Photos;
  heroImages?: HeroImage[];
  seasonsInfo?: any[];
  productionStatus?: ProductionStatus;
  directors?: Director[];
  writers?: Writer[];
  videos?: Videos;
  adWidgets?: any;
  id?: string;
  image?: Image12;
  runningTimeInMinutes?: number;
  nextEpisode?: string;
  numberOfEpisodes?: number;
  seriesStartYear?: number;
  title?: string;
  titleType?: string;
  year?: number;
}
