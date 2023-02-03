export default class movieApi {
  public getMovie = async (movieTitle: string) => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${movieTitle}&callback=?`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
}