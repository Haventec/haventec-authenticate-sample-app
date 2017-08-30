export class UserModel {

  public active;
  public dateCreated;
  public email;
  public lastLogin;
  public locked;

  constructor(){
    this.active = '';
    this.dateCreated = '';
    this.email = '';
    this.lastLogin = '';
    this.locked = '';
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
  }
}
