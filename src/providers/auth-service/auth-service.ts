import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:3000';
  private signUpUserPath: string = '/self-service/user';
  private registerUserPath: string = '/register/user';

  constructor(private http: Http) {}

  signUpUser(username: string, email: string) {
    let body = {
      'username': username,
      'email': email
    };

    return this.http.post(this.url + this.signUpUserPath, body).map(res => res.json());
  }

  registerUser(username: string, registrationToken: string, hashedPin: string, deviceName: string) {
    let body = {
      'username': username,
      'registrationToken': registrationToken,
      'hashedPin': hashedPin,
      'deviceName': deviceName
    };

    return this.http.post(this.url + this.registerUserPath, body).map(res => res.json());
  }
}
