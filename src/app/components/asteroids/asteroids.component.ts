import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsteroidsService } from 'src/app/services/apis/asteroids.service';
import { IAsteroid } from 'src/app/types/types';

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css'],
})
export class AsteroidsComponent {
  asteroids: IAsteroid[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'id',
    'name',
    'isPotentiallyHazardous',
    'estimatedDiameter',
  ];

  constructor(private asteroidsService: AsteroidsService) {
    this.asteroidsService
      .getCloseAsteroids()
      .then((data: IAsteroid[]) => {
        this.asteroids = data;
      })
      .catch((err) => console.log('ERROR', err));
  }

  filterResults = (startDate: any, endDate: any) => {
    event?.preventDefault();
    this.isLoading = true;
    this.asteroidsService
      .getCloseAsteroidsByDate(startDate, endDate)
      .then((data: IAsteroid[]) => {
        this.asteroids = data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log('ERROR', err);
        this.isLoading = false;
      });
  };
}
