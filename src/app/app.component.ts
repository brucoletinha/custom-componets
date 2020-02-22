import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectedDestination: string;
  public selectedDestination2: string;
  selectedDestination3 = new FormControl('');
  title = 'angular-dropdown';

  data = ["Paris",  "Mauritius",  "Singapore",  "Malaysia",  "Goa",  "Thailand"];
  
  data2 = [{id: 1, name:"Paris"}, {id: 2, name:"Mauritius"}, {id: 3, name:"Singapore"},  {id: 4, name:"Malaysia"},  {id: 5, name:"Goa"},{id: 6, name:"Thailand"} ];
}
