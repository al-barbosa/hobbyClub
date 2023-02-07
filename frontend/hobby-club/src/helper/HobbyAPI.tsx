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

  public postMessage = async (
    hobbyId: string,
    userId: string,
    text: string,
    token: string
) => {
    const URL = `/hobby/${hobbyId}/${userId}`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        text,
      }),
    });
    const data = await response.json();
    return data;
  }
}