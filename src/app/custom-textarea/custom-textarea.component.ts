import { Component, OnInit, Self, Optional, Input, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss']
})
export class CustomTextareaComponent implements OnInit, ControlValueAccessor {

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
 }

  @Input()
  public autofocus: boolean;
 
  @Input()
  public cols: number;

  @Input()
  public rows: number;
 
  @Input()
  public dirname;
 
  @Input()
  public disabled = false;
 
  @Input()
  public data: string;
 
  @Input()
  public form;

  @Input()
  public maxlength;

  @Input()
  public name;
  
  @Input()
  public placeholder;
  
  @Input()
  public label;
  
  @Input()
  public value;
  
  @Input()
  public required: boolean;

  public hasValue = false;

  @Input()
  public hasLabel = false;

  @Input()
  public removeWhiteSpace;

  @Input()
  public breakLineWhithSpace: number = 0;
  
  @Input()
  public hasClassDefault: boolean = true;

  @Input()
  public readonly: boolean = false;

  ngOnInit(): void {
    if(this.breakLineWhithSpace)
      this.onBreakLine();
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

  public onRemoveWhiteSpace() {
    return this.value = this.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  }

  public onBreakLine() {
    if (this.removeWhiteSpace)
      this.onRemoveWhiteSpace();

    const words = this.value.split(' ');
    let newText = '';
    if(words.length) {
      for(let i=0, start=0; i < words.length; i++, start++) {        
        if(start % this.breakLineWhithSpace == 0 && start) {
          newText +="\n";
        } else if(start) {
          newText +=" ";
        }
        newText += words[i];
      }
      this.value = newText;
    }
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
