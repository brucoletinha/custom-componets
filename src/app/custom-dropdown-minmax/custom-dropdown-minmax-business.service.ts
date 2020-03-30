import { Injectable } from '@angular/core';
import { CustomSelectMinMaxComponent } from './custom-select-minmax/custom-select-minmax.component';

@Injectable()
export class CustomDropdownMinMaxBusinessService {

  constructor() { }
  private select: CustomSelectMinMaxComponent;
  private multiple: boolean;
  private markDefault: boolean;
 
  public register(select: CustomSelectMinMaxComponent) {
    this.select = select;
  }
 
  public getSelect(): CustomSelectMinMaxComponent {
    return this.select;
  }

  public getMultiple(): boolean {
    return this.multiple;
  }

  public getMarkDefault() {
    return this.markDefault;
  }

  public setMarkDefault(markDefault: boolean) {
    this.markDefault = markDefault;
  }
}