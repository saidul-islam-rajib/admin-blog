import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  getImage(logo: any): string {
    return logo ? `http://localhost:5000${logo}` : '../../../../assets/images/default_image.jpeg';
  }
}
