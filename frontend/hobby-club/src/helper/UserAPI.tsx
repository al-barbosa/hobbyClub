export default class UserAPI {
  public getAll = async () => {
    const URL = 'user';
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data)
    return data;
  }
};