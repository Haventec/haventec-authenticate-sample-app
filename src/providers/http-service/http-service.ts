import { Injectable } from '@angular/core';
import { HaventecClient } from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service';

@Injectable()
export class HttpService {

  constructor(private haventecClient: HaventecClient,
              private logService: LogService) {
  }

  get(url: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.haventecClient.http.get(url, this.haventecClient.getAccessToken()).then(
        data => {
          resolve(data);
        },
        err => {
          this.logService.error(err);
          reject(err);
        }
      );
    });
  }

  post(url: string, body: {}, initialiseAppWithUsername?: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.haventecClient.http.postNoAuth(url, body).then(
        data => {
          if (initialiseAppWithUsername) {
            this.haventecClient.init(initialiseAppWithUsername);
          }

          this.haventecClient.updateDataFromResponse(data);
          resolve(data);
        },
        err => {
          this.logService.error(err);
          reject(err);
        }
      );
    });
  }

  delete(url: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.haventecClient.http.delete(url, this.haventecClient.getAccessToken()).then(
        data => {
          this.haventecClient.updateDataFromResponse(data);
          resolve(data);
        },
        err => {
          this.logService.error(err);
          reject(err);
        }
      );
    });
  }
}


