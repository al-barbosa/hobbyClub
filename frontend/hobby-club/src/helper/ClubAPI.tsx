export default class ClubAPI {
  public getInfo = async (id: string) => {
    const URL =`/club/${id}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
}