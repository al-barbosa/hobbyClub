export default class HobbyAPI {
  public getHobby = async (id: string) => {
    const URL = `/hobby/${id}`;;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  }
}