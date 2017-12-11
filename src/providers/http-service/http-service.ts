import { Injectable } from '@angular/core';
import { HaventecClient } from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service';

@Injectable()
export class HttpService {

  constructor(private haventecClient: HaventecClient,
              private logService: LogService) {
  }

  get(url: string): Promise<any> {

    this.logService.trace('GET Request: ' + url);

    return new Promise((resolve, reject) => {
      this.haventecClient.http.get(url, this.haventecClient.getAccessToken()).then(
        data => {
          this.logService.trace('GET Response: ' + url + ' with data ', data);
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

    this.logService.trace('POST Request: ' + url + ' with body ', body);

    return new Promise((resolve, reject) => {
      this.haventecClient.http.postNoAuth(url, body).then(
        data => {

          this.logService.trace('Response: ' + url + ' with data ', data);

          if (initialiseAppWithUsername) {
            this.logService.debug('Initialising App with username: ' + initialiseAppWithUsername);
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

    this.logService.trace('DELETE Request: ' + url);

    return new Promise((resolve, reject) => {
      this.haventecClient.http.delete(url, this.haventecClient.getAccessToken()).then(
        data => {

          this.logService.trace('Response: ' + url + ' with data ', data);

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


