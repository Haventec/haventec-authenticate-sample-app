import { Component } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { Sanctum } from '../../providers/sanctum/sanctum';

@Component({
    templateUrl: 'ht-wallets.html',
    selector: 'ht-wallets'
})
export class Wallets {

  walletValue = undefined;
  checkingForWallet = true;

  constructor(
    private alertCtrl: AlertController,
    private sanctum: Sanctum
  ){
    let self = this;

    this.sanctum.getVault().then(function(res) {
      self.checkingForWallet = false;
      let response = JSON.parse(res.text);
      console.log('DELETE_ME', response);

      if(response.responseStatus.status === 'SUCCESS'){
        self.walletValue = response.responseStatus.wallet;
      } else if(response.responseStatus.status === 'Error'){
        console.log(response.responseStatus.message);
      }
    }).catch(function(err) {
      console.log(err);
    });

  }

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

            let amount = Number(data.amount);
            this.walletValue = amount;

            this.sanctum.createVault(amount.toString()).then(function(res) {
              console.log(res);
            }).catch(function(err) {
              console.log(err);
            });
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
            let amount = Number(this.walletValue) + Number(data.amount);
            this.walletValue = amount;

            console.log('DELETE_ME', amount.toString());
            this.sanctum.updateVault(amount.toString()).then(function(res) {
              console.log(res);
            }).catch(function(err) {
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
