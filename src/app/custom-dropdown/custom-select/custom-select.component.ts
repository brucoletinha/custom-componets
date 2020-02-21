import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, AfterViewInit, forwardRef } from '@angular/core';
import { CustomDropdownComponent } from '../custom-dropdown.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { CustomDropdownService } from '../custom-dropdown.service';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    },
    CustomDropdownService
  ]
})
export class CustomSelectComponent implements OnInit, AfterViewInit {

  @Input()
  public label: string;
 
  @Input()
  public placeholder: string;
 
  @Input()
  public selected: string;
 
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;

  @ViewChild('input')
  public input: ElementRef;
  
  @ViewChild(CustomDropdownComponent)
  public dropdown: CustomDropdownComponent;
  
  @ContentChildren(CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>
  
  private keyManager: ActiveDescendantKeyManager<CustomSelectOptionComponent>

  constructor(private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
  }

  ngOnInit(): void {
  }

  public selectedOption: CustomSelectOptionComponent;
 
  public displayText: string;
 
  public ngAfterViewInit() {
   setTimeout(() => {
     this.selectedOption = this.options.toArray().find(option => option.key === this.selected);
     this.displayText = this.selectedOption ? this.selectedOption.value : '';
     this.keyManager = new ActiveDescendantKeyManager(this.options)
     .withHorizontalOrientation('ltr')
     .withVerticalOrientation()
     .withWrap();
    });
  }

  public showDropdown() {
    this.dropdown.show();
    
    if (!this.options.length) {
      return;
    }
    
    this.selected ? this.keyManager.setActiveItem(this.selectedOption) : this.keyManager.setFirstItemActive();
   }
  
  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public selectOption(option: CustomSelectOptionComponent) {
    this.keyManager.setActiveItem(option);
    this.selected = option.key;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.value : '';
    this.hideDropdown();
    this.input.nativeElement.focus();
    this.onChange();
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
    
      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }
    
    if (event.key === 'Enter' || event.key === ' ') {
      this.selectedOption = this.keyManager.activeItem;
      this.displayText = this.selectedOption ? this.selectedOption.value : '';
      this.hideDropdown();
      this.onChange();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.showing && this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.showing && event.preventDefault();
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
     this.selected = obj;
   }
  
   public onTouched() {
     this.onTouchedFn();
   }
  
   public onChange() {
     this.onChangeFn(this.selected);
   }
}
