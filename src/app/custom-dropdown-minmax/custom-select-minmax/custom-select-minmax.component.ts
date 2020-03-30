import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, AfterViewInit, forwardRef, HostListener } from '@angular/core';
import { CustomDropdownMinMaxComponent } from '../custom-dropdown-minmax.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CustomDropdownMinMaxBusinessService } from '../custom-dropdown-minmax-business.service';

@Component({
  selector: 'app-custom-select-minmax',
  templateUrl: './custom-select-minmax.component.html',
  styleUrls: ['./custom-select-minmax.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectMinMaxComponent),
      multi: true
    },
    CustomDropdownMinMaxBusinessService
  ]
})
export class CustomSelectMinMaxComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input()
  public label: string;
 
  @Input()
  public selected: any;
 
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;

  @Input()
  public placeholder = '';

  @Input()
  public nameButton = '';

  minValueInput: any;

  maxValueInput: any;

  @Input()
  requiredMin: boolean;

  @Input()
  requiredMax: boolean;

  result: any;
  
  @ViewChild(CustomDropdownMinMaxComponent, { static: true })
  public dropdown: CustomDropdownMinMaxComponent;
  
  constructor(private dropdownService: CustomDropdownMinMaxBusinessService) {
    this.dropdownService.register(this);
  }

  ngOnInit(): void {
    this.dropdownService.register(this);
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

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }
    
      /*if (!this.options.length) {
        event.preventDefault();
        return;
      }*/
    }
    
    if (event.key === 'Enter' || event.key === ' ') {
     /* this.selectedOption = this.keyManager.activeItem;
      this.selectOption(this.selectedOption);*/
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.showing && this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      //this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.showing && event.preventDefault();
    }
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
}
