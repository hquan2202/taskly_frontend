import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundColorService {
  private sidebarColorSource = new BehaviorSubject<string>('#ffffff'); // Default: White
  private textColorSource = new BehaviorSubject<string>('#000000'); // Default: Black
  private backgroundImageSource = new BehaviorSubject<string | null>(null); // Default: No Image

  sidebarColor$ = this.sidebarColorSource.asObservable();
  textColor$ = this.textColorSource.asObservable();
  backgroundImage$ = this.backgroundImageSource.asObservable();

  setNavbarTextColor(color: string): void {
    const textColor = this.getContrastingColor(color);
    this.textColorSource.next(textColor);
  }

  setSidebarColor(color: string): void {
    this.sidebarColorSource.next(color);

    // Determine the best text color for contrast
    const textColor = this.getContrastingColor(color);
    this.textColorSource.next(textColor);
  }

  setBackgroundImage(imageUrl: string): void {
    this.backgroundImageSource.next(imageUrl);
  }

  private getContrastingColor(rgbColor: string): string {
    const rgbValues = rgbColor.match(/\d+/g);
    if (!rgbValues) return '#ffffff';

    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}
