export class AccessCredential {

  private username: string;
  private deviceUuid: string;
  private accessToken: string;
  private pinSalt: string;
  private authKey: string;

  constructor(username: string) {
    this.username = username;
    this.deviceUuid = '';
    this.accessToken = '';
    this.pinSalt = '';
    this.authKey = '';
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getDeviceUuid(): string {
    return this.deviceUuid;
  }

  seDeviceUuid(deviceUuid: string): void {
    this.deviceUuid = deviceUuid;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  getPinSalt(): string {
    return this.pinSalt;
  }

  setPinSalt(pinSalt: string): void {
    this.pinSalt = pinSalt;
  }

  getAuthKey(): string {
    return this.authKey;
  }

  setAuthKey(authKey: string): void {
    this.authKey = authKey;
  }
}



