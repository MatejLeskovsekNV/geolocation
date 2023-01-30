import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Geolocator PWA';
  geolocation = '';
  fullResponse = '';
  lat = '';
  lon = '';

  getGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          this.geolocation = '(' + position.coords.latitude + ', ' + position.coords.longitude + ')';
          this.lat = position.coords.latitude.toString();
          this.lon = position.coords.longitude.toString();
        }
        this.fullResponse = JSON.stringify(this.cloneAsObject(position));
      },
        (error: GeolocationPositionError) => {
          console.log(error);
          this.fullResponse = JSON.stringify(this.cloneAsObject(error));
          this.geolocation = 'dostop zavrnjen'
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  cloneAsObject(obj: any): any {
    if (obj === null || !(obj instanceof Object)) {
      return obj;
    }
    var temp: any = (obj instanceof Array) ? [] : {};
    for (var key in obj) {
        temp[key] = this.cloneAsObject(obj[key]);
    }
    return temp;
  }
}
