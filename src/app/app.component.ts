import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    }, 1000);
  }
  checkAll: boolean;
  ngOnInit(): void {
    this.checkAll = false;
  }
  public selectedDestination: string;
  public selectedDestination2: string;
  selectedDestination3 = new FormControl('');
  public selectedDestination4: string;
  public selectedDestination5: any;
  public customInput;
  public customInput2;
  public customInput3;

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
  
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  title = 'angular-dropdown';

  data = ["Paris",  "Mauritius",  "Singapore",  "Malaysia",  "Goa",  "Thailand"];
  
  data2 = [{id: 1, name:"Paris"}, {id: 2, name:"Mauritius"}, {id: 3, name:"Singapore"},  {id: 4, name:"Malaysia"},  {id: 5, name:"Goa"},{id: 6, name:"Thailand"} ];
  buttons = [{id: 1, name:"Salvar"}, {id: 2, name:"Editar"}, {id: 3, name:"Cancelar"} ];
  
  errors = new Map<string, () => string>();
  showContent() {
    console.log(this.profileForm3.get("item").value);
    console.log(this.selectedDestination5);    
    console.log("this.selectedDestination: ", this.selectedDestination)
  }
  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  selectAll() {
    console.log("selectAll: ", this.profileForm3.get('item').value)
    /*
    if (!this.checkAll) {
      this.checkAll = true;
      this.profileForm3.get("item").setValue(null);
      this.profileForm3.get("item").setValue(this.data2);
    } else {
      this.checkAll = false;
      this.profileForm3.get("item").setValue(null);
    }
    console.log("formControl: ", this.profileForm3.get("item").value);*/
  }
  mostrar () {
    console.log("this.customInput: ", this.customInput)
  }

  limpar() {
    this.profileForm3 = this.fb.group({
      item: new FormControl([null])
    });
    console.log("limpar: ", this.profileForm3.get('item').value)
    this.customInput = null;
    this.customInput2 = null;
  }
  selectOne(values: any) {
    console.log("selectOne: ", this.profileForm3.get('item').value)
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
