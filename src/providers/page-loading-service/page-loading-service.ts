import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class PageLoadingService {

  private pageLoading: any;

  constructor(private loadingController: LoadingController) {
    this.createLoader();
  }


  dismiss() {
    this.pageLoading.dismiss()
  }

  present() {
    console.log(this.pageLoading);
    this.createLoader();
    this.pageLoading.present();
  }

  private createLoader() {
    this.pageLoading = this.loadingController.create();
  }

}
