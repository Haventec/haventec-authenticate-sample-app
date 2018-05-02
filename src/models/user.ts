export class UserModel {

  public active;
  public dateCreated;
  public devices;
  public deviceUuid;
  public email;
  public lastLogin;
  public locked;
  public username;
  public wallets;

  constructor(){
    this.active = '';
    this.dateCreated = '';
    this.devices = [];
    this.deviceUuid = '';
    this.email = '';
    this.lastLogin = '';
    this.locked = '';
    this.username = '';
    this.wallets = [];
  }

  setData(userResponse: any){

    if(userResponse.active){
      this.active = userResponse.active
    }

    if(userResponse.dateCreated){
      this.dateCreated = userResponse.dateCreated
    }

    if(userResponse.devices){
      this.devices = userResponse.devices
    }

    if(userResponse.email){
      this.email = userResponse.email
    }

    if(userResponse.lastLogin){
      this.lastLogin = userResponse.lastLogin
    }

    if(userResponse.locked){
      this.locked = userResponse.locked
    }
  }
}
