import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  url = 'https://fassbackend.onrender.com/fass';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.url);
  }

  getUserByUser(user: String): Observable<UserModel[]> {
    let way = `${this.url}?nameFilter=${user}`;
    return this.http.get<UserModel[]>(way);
  }
}