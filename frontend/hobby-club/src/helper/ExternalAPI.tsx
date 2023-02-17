// import 'dotenv/config';

export default class MovieAPI {
  public getMovie = async (movieTitle: string, page: string='1') => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_MDA_KEY as string,
        'X-RapidAPI-Host': process.env.REACT_APP_MDA_HOST as string,
      }
    };

    const URL = `https://movie-database-alternative.p.rapidapi.com/?s=${movieTitle}&r=json&page=${page}`;
    const response = await fetch(URL, options);
    const data = await response.json();
    console.log(data)
    return data;
  }
};