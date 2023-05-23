import { Injectable } from '@angular/core';
import { ApiKeyService } from '../middlewares/api-key.service';
import { IAsteroid } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class AsteroidsService {
  constructor(private apiKeyService: ApiKeyService) {}
  async getCloseAsteroids(): Promise<IAsteroid[]> {
    const API_URL = this.apiKeyService.withApiKey(
      'https://api.nasa.gov/neo/rest/v1/neo/browse'
    );
    const result = await fetch(API_URL);
    if (result.status === 200) {
      const data = await result.json();

      const filteredData: IAsteroid[] = data.near_earth_objects.map(
        (asteroid: any) => {
          return {
            id: asteroid.id,
            name: asteroid.name,
            isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid,
            estimatedDiameter: {
              estimatedDiameterMin:
                asteroid.estimated_diameter.kilometers.estimated_diameter_min,
              estimatedDiameterMax:
                asteroid.estimated_diameter.kilometers.estimated_diameter_max,
            },
          };
        }
      );
      return filteredData;
    }

    return [];
  }

  async getCloseAsteroidsByDate(
    startDate?: string,
    endDate?: string
  ): Promise<IAsteroid[]> {
    const API_URL = this.apiKeyService.withApiKey(
      'https://api.nasa.gov/neo/rest/v1/feed'
    );
    const result = await fetch(
      `${API_URL}&start_date=${startDate}&end_date=${endDate}`
    );

    if (result.status === 200) {
      const data = await result.json();
      const asteroidsData = data.near_earth_objects;

      const asteroids: IAsteroid[] = [];
      for (const date in asteroidsData) {
        asteroidsData[date].forEach((asteroid: any) => {
          const filteredAsteroid: IAsteroid = {
            id: asteroid.id,
            name: asteroid.name,
            isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid,
            estimatedDiameter: {
              estimatedDiameterMin:
                asteroid.estimated_diameter.kilometers.estimated_diameter_min,
              estimatedDiameterMax:
                asteroid.estimated_diameter.kilometers.estimated_diameter_max,
            },
          };
          asteroids.push(filteredAsteroid);
        });
      }

      return asteroids;
    }

    return [];
  }
}
