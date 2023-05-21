import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaPictureOfTheDayService } from 'src/app/services/apis/picture-of-the-day.service';
import { IPictureOfTheDay } from 'src/app/types/types';

@Component({
  selector: 'app-picture-of-the-day',
  // imports: [CommonModule],
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.css'],
})
export class PictureOfTheDayComponent {
  imageUrl: string = '';
  constructor(private pictureOfTheDayService: NasaPictureOfTheDayService) {
    this.pictureOfTheDayService
      .getPictureOfTheDay()
      .then((pictureOfTheDay: IPictureOfTheDay | null) => {
        this.imageUrl = pictureOfTheDay?.url ?? '';
      })
      .catch((err) => (this.imageUrl = ''));
  }
}
