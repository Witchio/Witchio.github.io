import { Component } from '@angular/core';
import { NasaPictureOfTheDayService } from 'src/app/services/apis/picture-of-the-day.service';
import { IPictureOfTheDay } from 'src/app/types/types';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.css'],
})
export class PictureOfTheDayComponent {
  imageUrl: string = '';
  description: string = '';
  constructor(private pictureOfTheDayService: NasaPictureOfTheDayService) {
    this.pictureOfTheDayService
      .getPictureOfTheDay()
      .then((pictureOfTheDay: IPictureOfTheDay | null) => {
        this.imageUrl = pictureOfTheDay?.url ?? '';
        this.description = pictureOfTheDay?.explanation ?? '';
      })
      .catch((err) => (this.imageUrl = ''));
  }
}
