import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  apiKey = 'qsPfqhjhsI8Xps8wEGeooG7sclROja9vdWqqgbwA';

  constructor() {}

  withApiKey(url: string) {
    return url + "?api_key=" + this.apiKey;
  }
}
