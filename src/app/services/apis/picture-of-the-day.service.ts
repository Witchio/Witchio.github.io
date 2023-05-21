import { Injectable } from '@angular/core';
import { ApiKeyService } from '../middlewares/api-key.service';
import { IPictureOfTheDay } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class NasaPictureOfTheDayService {
  private API_URL = this.apiKeyService.withApiKey(
    'https://api.nasa.gov/planetary/apod'
  );

  constructor(private apiKeyService: ApiKeyService) {}

  async getPictureOfTheDay(): Promise<IPictureOfTheDay | null> {
    const result = await fetch(this.API_URL);
    if (result.status === 200) {
      const data = await result.json();

      const filteredData: IPictureOfTheDay = {
        title: data.title,
        url: data.url,
        explanation: data.explanation,
      };
      return filteredData;
    }

    return null;
  }
}
