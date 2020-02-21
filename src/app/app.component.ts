import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectedDestination: string;
  title = 'angular-dropdown';

  data = ["Paris",  "Mauritius",  "Singapore",  "Malaysia",  "Goa",  "Thailand"];
}
