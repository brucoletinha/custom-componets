import { Injectable } from '@angular/core';
import { CustomSelectButtonComponent } from './custom-select-button/custom-select-button.component';

@Injectable()
export class CustomDropdownButtonBusinessService {

  constructor() { }
  private select: CustomSelectButtonComponent;
  private multiple: boolean;
  private checkAll: boolean;
 
  public register(select: CustomSelectButtonComponent) {
    this.select = select;
    this.multiple = this.select.multiple;
  }
 
  public getSelect(): CustomSelectButtonComponent {
    return this.select;
  }

  public getMultiple(): boolean {
    return this.multiple;
  }

  public getCheckAll() {
    return this.checkAll;
  }

  public setCheckAll(checkAll: boolean) {
    this.checkAll = checkAll;
  }
}