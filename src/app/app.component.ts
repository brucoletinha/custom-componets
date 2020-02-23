import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  checkAll: boolean;
  ngOnInit(): void {
    this.checkAll = false;
  }
  public selectedDestination: string;
  public selectedDestination2: string;
  selectedDestination3 = new FormControl('');
  public selectedDestination4: string;
  public selectedDestination5: any;

  constructor(private fb: FormBuilder) { }

  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  profileForm2 = this.fb.group({
    item: this.fb.group({
      id: null,
      name: null
    }),
  });

  profileForm3 = this.fb.group({
    item: new FormControl([null])
  });
  
  title = 'angular-dropdown';

  data = ["Paris",  "Mauritius",  "Singapore",  "Malaysia",  "Goa",  "Thailand"];
  
  data2 = [{id: 1, name:"Paris"}, {id: 2, name:"Mauritius"}, {id: 3, name:"Singapore"},  {id: 4, name:"Malaysia"},  {id: 5, name:"Goa"},{id: 6, name:"Thailand"} ];
  showContent() {
    console.log(this.profileForm3.get("item").value);
    console.log(this.selectedDestination5);
  }
  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  selectAll() {
    if (!this.checkAll) {
      this.checkAll = true;
      this.profileForm3.get("item").setValue(null);
      this.profileForm3.get("item").setValue(this.data2);
    } else {
      this.checkAll = false;
      this.profileForm3.get("item").setValue(null);
    }
    console.log("formControl: ", this.profileForm3.get("item").value);
  }

  selectOne(values: any) {
    if (this.profileForm3.controls.item.value.length === this.data2.length) {
      this.checkAll = false;
      this.selectAll();
    } else if (this.checkAll) {
      this.checkAll = false;
      this.profileForm3.get("item").setValue(null);
      this.profileForm3.get("item").setValue(values);
    }
  }
}
