import { Component, OnInit, Input, forwardRef, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})

export class CustomInputComponent implements OnInit, ControlValueAccessor {

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
    this.errorMessages.set('required', () => `${this.label} is required.`);
    this.errorMessages.set('minlength', () => `The no. of characters should not be less than ${this.minlength}.`);
    this.errorMessages.set('maxlength', () => `The no. of characters should not be greater than ${this.maxlength}.`);
 }

  @Input()
  public label: string;
 
  @Input()
  public placeholder: string;
 
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;
 
  @Input()
  public data: string;
 
  @Input()
  public minlength = 0;

  @Input()
  public maxlength = 0;

  @Input()
  public type = "text";

  public hasValue = false;

  ngOnInit(): void {
  }

  private errorMessages = new Map<string, () => string>();

  public get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }
  
  public get showError(): boolean {
      if (!this.control) {
          return false;
      }
    
      const { dirty, touched } = this.control;
    
      return this.invalid ? (dirty || touched) : false;
  }
    
  public get errors(): Array<string> {
      if (!this.control) {
          return [];
      }
    
      const { errors } = this.control;
      return Object.keys(errors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)() : <string>errors[key] || key);
  }

  public onChangeFn = (_: any) => {};
 
  public onTouchedFn = () => {};
 
  public registerOnChange(fn: any): void {
     this.onChangeFn = fn;
  }
 
  public registerOnTouched(fn: any): void {
     this.onTouchedFn = fn;
  }
 
  public setDisabledState(isDisabled: boolean): void {
     this.disabled = isDisabled;
  }
 
  public writeValue(obj: any): void {
     this.data = obj;
     this.hasValue = false;
  }
 
  public onChange() {
     this.hasValue = this.data ? true : false;
     this.onChangeFn(this.data);
  }
}
