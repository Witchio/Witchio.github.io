export interface IAsteroid {
  id: string;
  name: string;
  isPotentiallyHazardous: boolean;
  estimatedDiameter: IEstimatedDiameter;
}

interface IEstimatedDiameter {
  estimatedDiameterMin: number;
  estimatedDiameterMax: number;
}

export interface IPictureOfTheDay {
  title: string;
  url: string;
  explanation: string;
}
