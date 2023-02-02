export default class UserAPI {
  public getAll = async () => {
    const URL = 'user';
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data)
    return data;
  }

  public async login(email: string, password: string) {
    const URL = 'user/login';
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const data = await response.json();
    return data;
  }

  public async createUser(email: string, username: string, password: string) {
    const URL = 'user';
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        password,
      })
    });
    const data = await response.json();
    return data;
  }
};