import { Injectable } from '@angular/core';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@Injectable({
  providedIn: 'root'
})
export class CustomDropdownService {

  constructor() { }
  private select: CustomSelectComponent;
  private multiple: boolean;
 
  public register(select: CustomSelectComponent) {
    this.select = select;
    this.multiple = this.select.multiple;
  }
 
  public getSelect(): CustomSelectComponent {
    return this.select;
  }

  public getMultiple(): boolean {
    return this.multiple;
  }
}
