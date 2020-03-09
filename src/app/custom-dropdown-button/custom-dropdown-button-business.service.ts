import { Injectable } from '@angular/core';
import { CustomSelectButtonComponent } from './custom-select-button/custom-select-button.component';

@Injectable()
export class CustomDropdownButtonBusinessService {

  constructor() { }
  private select: CustomSelectButtonComponent;
  private multiple: boolean;
  private markDefault: boolean;
 
  public register(select: CustomSelectButtonComponent) {
    this.select = select;
  }
 
  public getSelect(): CustomSelectButtonComponent {
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