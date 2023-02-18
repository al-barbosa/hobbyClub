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

  public getMessages = async (id: string) => {
    const URL =`/club/${id}/messages`;
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

  public postMessage = async (
    clubId: string,
    userId: string,
    text: string,
    token: string
  ) => {
    const URL = `/club/${clubId}/messages`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        userId,
        text,
      }),
    });
    const data = await response.json();
    return data;
  }


  public addHobbie = async (
    name: string,
    img: string,
    type: string,
    clubId: number,
    token: string,
  ) => {
    const URL = `/club/${clubId}`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        name,
        img,
        type
      }),
    });
    const data = await response.json();
    return data;
  }

  public endHobbie = async (
    clubId: number,
    hobbieId: number,
    token: string
  ) => {
    const URL = `/club/${clubId}/${hobbieId}`;

    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    const data = await response.json();
    return data;
  }
}

