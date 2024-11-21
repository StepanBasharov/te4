import { ListOfLots } from "../types/Lot.type";
import { ListOfUsers, ListOfWinners } from "../types/user.type";

type PostPayload = {
    lot_id: number,
    users_ids: number[]
}

export class Api {
  constructor() {
    this.URL = "http://176.114.90.65:8080/";
  }

  public URL;

  public async get<R>(url: string): Promise<R> {
    return fetch(this.URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(r => this.getJsonResponse(r));
  }

  public async getAllLots() {
    return this.get<ListOfLots>("lots");
  }

  public async getLotUsers(id: number) {
    return this.get<ListOfUsers>(`lot/${id}/users`)
  }

  public async getLotWinners(id: number) {
    return this.get<ListOfWinners>(`lot/${id}/winners`)
  }

  public async setWinners(payload: PostPayload) {
    return fetch(this.URL + "lot/set_winners", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(r => {return r});
  }

  private getJsonResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("access-token");
      window.location.reload();
    }
    throw new Error(res.statusText);
  }
}

const api = new Api()

export default api;