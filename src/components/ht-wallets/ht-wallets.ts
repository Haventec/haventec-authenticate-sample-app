import { Component, Input } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { UserModel } from '../../models/user';

@Component({
    templateUrl: 'ht-wallets.html',
    selector: 'ht-wallets'
})
export class Wallets {

  @Input() user: UserModel;

  constructor(private alertCtrl: AlertController){}

  addWallet() {
    let alert = this.alertCtrl.create({
      title: 'How many SDG coins would you like to purchase?',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Number of coins'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: data => {
            this.user.wallets.push({'amount': Number(data.amount)});
          }
        }
      ]
    });
    alert.present();
  }

  addAmount() {
    let alert = this.alertCtrl.create({
      title: 'Top up',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Number of coins'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: data => {
            this.user.wallets[0].amount = this.user.wallets[0].amount + Number(data.amount);
          }
        }
      ]
    });
    alert.present();
  }
}
