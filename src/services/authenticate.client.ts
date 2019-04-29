import { HT_HttpService } from "./http.service";
import {HaventecAuthenticate} from '@haventec/authenticate-web-sdk';
import { Injectable } from "@angular/core";

@Injectable()
export class HaventecAuthenticateClient {

    private applicationUuid: string;
    private currentUser: string;
    private domain: string;
    private haventecAuthenticate : HaventecAuthenticate;

    constructor(private http:  HT_HttpService
    ) {
        
    }

    public init(applicationUuid: string, domain: string) {
        this.applicationUuid = applicationUuid;
        this.domain = domain;
    }

    public activateDevice(username: string, pin: string, activationToken: string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/activate/device');

        this.setCurrentUser(username);

        let requestBody = {
            activationToken: activationToken,
            applicationUuid: this.applicationUuid,
            deviceUuid: this.haventecAuthenticate.getDeviceUuid(),
            hashedPin: this.haventecAuthenticate.hashPin(pin),
            username: username
        };

        return this.postNoAuth(url, requestBody);
    }

    public addDevice(username: string, deviceName?: string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device');

        this.setCurrentUser(username);

        if(!deviceName){
            deviceName = this.haventecAuthenticate.getDeviceName();
        }

        let requestBody = {
            applicationUuid: this.applicationUuid,
            deviceName: deviceName,
            username: username
        };

        return this.postNoAuth(url, requestBody);
    }

    public activateUser(username:string, activationToken:string, pin:string, urlOverwrite?:string, deviceName?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/activate/user');

        this.setCurrentUser(username);

        if(!deviceName){
            deviceName = this.haventecAuthenticate.getDeviceName();
        }

        let requestBody = {
            activationToken: activationToken,
            applicationUuid: this.applicationUuid,
            deviceName: deviceName,
            hashedPin: this.haventecAuthenticate.hashPin(pin),
            username: username
        };

        return this.postNoAuth(url, requestBody);
    }

    public deleteDevice(deviceUuid: string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.delete(url);
    }

    public lockDevice(deviceUuid: string, urlOverwrite?:string) {
        let requestBody = {
            "locked": true
        };

        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.patch(url, requestBody);
    }

    public unlockDevice(deviceUuid: string, urlOverwrite?:string) {
        let requestBody = {
            "locked": false
        };

        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.patch(url, requestBody);
    }

    public forgotPin(username: string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/forgot-pin');

        this.setCurrentUser(username);

        let requestBody = {
            applicationUuid: this.applicationUuid,
            deviceUuid: this.haventecAuthenticate.getDeviceUuid(),
            username: this.haventecAuthenticate.getUsername()
        };

        return this.postNoAuth(url, requestBody);
    }

    public getCurrentUserDetails(urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/user/current');
        return this.http.get(url, this.getAccessToken())
    }

    public getUserDevices(userUuid: string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/user/' + userUuid + '/device');
        return this.http.get(url, this.getAccessToken())
    }

    public login(username: string, pin: string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/login');

        this.setCurrentUser(username);

        let requestBody = {
            applicationUuid: this.applicationUuid,
            authKey: this.haventecAuthenticate.getAuthKey(),
            deviceUuid: this.haventecAuthenticate.getDeviceUuid(),
            hashedPin: this.haventecAuthenticate.hashPin(pin),
            username: username
        };

        return this.postNoAuth(url, requestBody);
    }

    public logout(urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/logout');
        return new Promise((resolve, reject) => {
            this.delete(url).then(
                data => {
                    this.haventecAuthenticate.clearAccessToken();
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    public resetPin(username: string, resetPinToken: string, pin:string, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/reset-pin');

        this.setCurrentUser(username);

        let requestBody = {
            applicationUuid: this.applicationUuid,
            deviceUuid: this.haventecAuthenticate.getDeviceUuid(),
            hashedPin: this.haventecAuthenticate.hashPin(pin),
            resetPinToken: resetPinToken,
            username: username
        };

        return this.postNoAuth(url, requestBody);
    }

    public signUp(username: string, email: string, urlOverwrite?:string, mobileNumber?: string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/self-service/user');

        this.setCurrentUser(username);

        let requestBody = {
            applicationUuid: this.applicationUuid,
            email: email,
            username: username,
            mobileNumber: mobileNumber,
        };

        return this.postNoAuth(url, requestBody);
    }

    private setCurrentUser(username: string) {
        if(username && this.currentUser !== username){
            this.currentUser = username;
            this.haventecAuthenticate = new HaventecAuthenticate(username);
        }
    }


    private patch(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.http.patch(url, data, this.getAccessToken()).then(
                data => {
                    this.haventecAuthenticate.updateStorage(<any>data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }


    private postNoAuth(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.http.postNoAuth(url, data).then(
                data => {
                    this.haventecAuthenticate.updateStorage(<any>data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    private delete(url: string) {
        return new Promise((resolve, reject) => {
            this.http.delete(url, this.getAccessToken()).then(
                data => {
                    this.haventecAuthenticate.updateStorage(<any>data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    public getHashPin(pin: string): string {
        return this.haventecAuthenticate.hashPin(pin);;
    }

    public getUsername() {
        return this.haventecAuthenticate ? this.haventecAuthenticate.getUsername(): undefined;
    }

    public getAccessToken(): string {
        return this.haventecAuthenticate.getAccessToken();
    }

    public getDeviceUuid(): string {
        return this.haventecAuthenticate.getDeviceUuid();
    }

    public getUserUuid(): string {
        return this.haventecAuthenticate.getUserUuid();
    }

    public getAuthKey(): string {
        return this.haventecAuthenticate.getAuthKey();
    }

    public updateDataFromResponse(response: any): void {
        this.haventecAuthenticate.updateStorage(response);
    }

    public invalidateToken(): void {
        this.haventecAuthenticate.clearAccessToken();
    }

    public purge(): void {
        this.currentUser = undefined;
        this.haventecAuthenticate.clearUserStorage();
    }

    public getDeviceName(): string {
        return this.haventecAuthenticate.getDeviceName();
    }

}
