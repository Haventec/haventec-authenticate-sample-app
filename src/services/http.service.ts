import { Http, Headers, RequestOptions } from '@angular/http';
import * as request from "superagent";
import { Injectable } from '@angular/core';

@Injectable()
export class HT_HttpService {

    constructor(private http: Http) {
    }

    public get(url: string, access_token: string) {

        var self = this;
        return new Promise((resolve, reject) => {
            request.get(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }
    
    public patch(url: string, data: any, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.patch(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .send(data)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }



    public put(url: string, data: any, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.put(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .send(data)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public postNoAuth(url: string, data: any) {
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(url, data, options).toPromise().then(response => response.json()).then(response => {
            if (this.validateResponse(response)) {
                return response;
            } else {
                return Promise.reject(response);
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    public delete(url: string, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.delete(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public validateResponse(response: any): boolean {
            if ( response && response.responseStatus && response.responseStatus.status &&
                response.responseStatus.status.toString().toUpperCase() === "SUCCESS"
            ) {
                return true;
            } else {
                return false;
            }
    }

}
