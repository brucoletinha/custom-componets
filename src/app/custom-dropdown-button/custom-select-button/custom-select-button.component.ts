import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, AfterViewInit, forwardRef, HostListener } from '@angular/core';
import { CustomDropdownButtonComponent } from '../custom-dropdown-button.component';
import { CustomSelectButtonOptionComponent } from '../custom-select-button-option/custom-select-button-option.component';
import { CustomDropdownButtonBusinessService } from '../custom-dropdown-button-business.service';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-custom-select-button',
  templateUrl: './custom-select-button.component.html',
  styleUrls: ['./custom-select-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectButtonComponent),
      multi: true
    },
    CustomDropdownButtonBusinessService
  ]
})
export class CustomSelectButtonComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input()
  public label: string;
 
  @Input()
  public selected: any;
 
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;

  @Input()
  public markAll = false;

  @ViewChild('input', { static: true })
  public input: ElementRef;
  
  @ViewChild(CustomDropdownButtonComponent, { static: true })
  public dropdown: CustomDropdownButtonComponent;
  
  @ContentChildren(CustomSelectButtonOptionComponent)
  public options: QueryList<CustomSelectButtonOptionComponent>

  public _selectionModel: SelectionModel<CustomSelectButtonOptionComponent>;
  
  private keyManager: ActiveDescendantKeyManager<CustomSelectButtonOptionComponent>

  constructor(private dropdownService: CustomDropdownButtonBusinessService) {
    this.dropdownService.register(this);
  }

  ngOnInit(): void {
    this.dropdownService.register(this);
    this._selectionModel = new SelectionModel(this.dropdownService.getMultiple(), []);
  }

  public selectedOption: CustomSelectButtonOptionComponent;
 
  public displayText: string;
 
  public ngAfterViewInit() {
   setTimeout(() => {
     this.selectedOption = this.options.toArray().find(option => option.key === this.selected);
     this.displayText = this.selectedOption ? this.selectedOption.value : '';
     this.keyManager = new ActiveDescendantKeyManager(this.options)
     .withHorizontalOrientation('ltr')
     .withVerticalOrientation()
     .withWrap();

      this.selectOptionDefault();
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

  public selectOption(option: CustomSelectButtonOptionComponent) {     
    this.keyManager.setActiveItem(option);
    this.selected = option.key;
    this.selectedOption = option;
    this.displaySting(this.selectedOption);
    this.hideDropdown();
    this.input.nativeElement.focus();
    this.onChange();
  }

  private selectOptionDefault() {
    const _options = this.options.toArray();
    let markDefault = _options.find(item => item.markDefault == true);
    if (markDefault) {
      this._selectionModel.select(markDefault);
      this.displaySting(markDefault); 
    }   
  }

  displaySting(filteredOptions: CustomSelectButtonOptionComponent) {
    this.displayText = '';
    this.displayText = filteredOptions.value;
    this.selected = filteredOptions.key;
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
      this.selectOption(this.selectedOption);
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
     this.displayText = '';
     this._selectionModel.clear();
   }
  
   public onTouched() {
     this.onTouchedFn();
   }
  
   public onChange() {
     this.onChangeFn(this.selected);
   }
}
