import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, AfterViewInit, forwardRef, HostListener } from '@angular/core';
import { CustomDropdownMinMaxComponent } from '../custom-dropdown-minmax.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-custom-input-minmax',
  templateUrl: './custom-input-minmax.component.html',
  styleUrls: ['./custom-input-minmax.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputMinMaxComponent),
      multi: true
    }
  ]
})
export class CustomInputMinMaxComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input()
  public label: string;
  
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;

  @Input()
  public placeholder = '';

  @Input()
  public nameButton = '';

  @Input()
  requiredMin: boolean;

  @Input()
  requiredMax: boolean;

  minValueInput: number;

  maxValueInput: number;

  result: any;
  
  @ViewChild(CustomDropdownMinMaxComponent, { static: true })
  public dropdown: CustomDropdownMinMaxComponent;
  
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.displayText = this.placeholder;
  }, 10);
  }
 
  public displayText: string;
 
  public showDropdown() {
    this.dropdown.show();
    event.stopPropagation();
  }
    
  public hideDropdown() {
    this.dropdown.hide();
  }

   onSetValuesAndDisplayText() {
    this.displayText = this.onSetDisplayText(this.minValueInput, this.maxValueInput);
    this.result = { min: this.minValueInput, max: this.maxValueInput };
    this.onChange();
    this.hideDropdown();
   }

   private onSetDisplayText(minValueInput: any, maxValueInput: any) {
    let displayText = '';
    if (minValueInput) {
      displayText = `${minValueInput}`;
      if (maxValueInput) {
        displayText = `${minValueInput} até ${maxValueInput}`;
      }
    } else if (maxValueInput) {
        displayText = `${maxValueInput}`;
    }
    return displayText;
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
     this.result = obj;
     this.displayText = this.placeholder ? this.placeholder : '';
     this.minValueInput = null;
     this.maxValueInput = null;
   }
  
   public onTouched() {
     this.onTouchedFn();
   }
  
   public onChange() {
     this.onChangeFn(this.result);
   }

   public isInvalid(): boolean {
     if (this.minValueInput && this.maxValueInput && +this.minValueInput > +this.maxValueInput)
      return true;
    return false;
   }
}
