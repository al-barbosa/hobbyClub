interface IExternalHobby {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
}

export default interface IExternalApi {
  Search: IExternalHobby[],
  totalResults: string,
}