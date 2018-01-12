export class UserModel {

  public active;
  public dateCreated;
  public email;
  public lastLogin;
  public locked;
  public devices;
  public deviceUuid;

  constructor(){
    this.active = '';
    this.dateCreated = '';
    this.email = '';
    this.lastLogin = '';
    this.locked = '';
    this.devices = [];
    this.deviceUuid = '371584cc-d1f4-4326-a215-403a6007b36c';
  }

  setData(userResponse: any){

    if(userResponse.active){
      this.active = userResponse.active
    }

    if(userResponse.dateCreated){
      this.dateCreated = userResponse.dateCreated
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

    if(userResponse.devices){
      this.devices = userResponse.devices
    }
  }
}
