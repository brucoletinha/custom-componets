import { Injectable } from '@angular/core';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@Injectable()
export class CustomDropdownService {

  constructor() { }
  private select: CustomSelectComponent;
  private multiple: boolean;
  private checkAll: boolean;
 
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

  public getCheckAll() {
    return this.checkAll;
  }

  public setCheckAll(checkAll: boolean) {
    this.checkAll = checkAll;
  }
}