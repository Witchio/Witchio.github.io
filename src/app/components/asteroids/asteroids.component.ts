import { Component } from '@angular/core';
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
  isDateRangeError: boolean = false;
  isEndDateBeforeStartDate: boolean = false;
  isMissingDateError: boolean = false;
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
    this.isDateRangeError = false;
    this.isEndDateBeforeStartDate = false;
    this.isMissingDateError = false;

    const startDateObj: Date = new Date(startDate);
    const endDateObj: Date = new Date(endDate);

    if (!startDate || !endDate) {
      this.isMissingDateError = true;
      return;
    }
    if (startDateObj >= endDateObj) {
      this.isEndDateBeforeStartDate = true;
      return;
    }

    const differenceInMilliseconds = Math.abs(
      endDateObj.getTime() - startDateObj.getTime()
    );
    const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);

    if (differenceInDays > 7) {
      this.isDateRangeError = true;
      return;
    }

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
