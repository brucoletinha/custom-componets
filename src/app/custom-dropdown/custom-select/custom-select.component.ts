import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, AfterViewInit, forwardRef, HostListener } from '@angular/core';
import { CustomDropdownComponent } from '../custom-dropdown.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { CustomDropdownService } from '../custom-dropdown.service';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-custom-select',
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
export class CustomSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input()
  public label: string;
 
  @Input()
  public placeholder: string;
 
  @Input()
  public selected: any;
 
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;

  @Input()
  public multiple = false;

  @Input()
  public markAll = false;

  @ViewChild('input', { static: true })
  public input: ElementRef;
  
  @ViewChild(CustomDropdownComponent, { static: true })
  public dropdown: CustomDropdownComponent;
  
  @ContentChildren(CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>

  public _selectionModel: SelectionModel<CustomSelectOptionComponent>;
  
  private keyManager: ActiveDescendantKeyManager<CustomSelectOptionComponent>

  private filteredOptions: any[];

  constructor(private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
  }

  ngOnInit(): void {
    this.filteredOptions = [];
    this.dropdownService.register(this);
    this._selectionModel = new SelectionModel(this.dropdownService.getMultiple(), []);
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
     
      this.markAllOptions();
    });
  }

  public showDropdown() {
    this.dropdown.show();
    
    if (!this.options.length) {
      return;
    }
    
    if (!this.multiple)
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
    
    if (this.multiple) {
      this.selectOptionMultiple(option);
    } else {
      this.displayText = this.selectedOption ? this.selectedOption.value : '';
      this.hideDropdown();
      this.input.nativeElement.focus();
    }
    this.onChange();
  }

  private selectOptionMultiple(option: CustomSelectOptionComponent) {

    const _options = this.options.toArray();
    if (option.checkAll) {
      if (this._selectionModel.selected.length == _options.length) {        
        this._selectionModel.clear();       
      } else {
        _options.forEach(item => {
          this._selectionModel.select(item);
        });
      }
    } else {
      let checkAll = this._selectionModel.selected.find(item => item.checkAll == true);
      if (checkAll) {
        this._selectionModel.deselect(checkAll);
      }
      
      if (this._selectionModel.isSelected(this.selectedOption)) {
        this._selectionModel.deselect(this.selectedOption);
      } else {
        this._selectionModel.select(this.selectedOption);
        checkAll = _options.find(item => item.checkAll == true);
        if (checkAll && this._selectionModel.selected.length == (_options.length - 1)) {          
          this._selectionModel.select(checkAll);        
        }
      }
    }    
    this.displaySting(this._selectionModel.selected);  
  }

  displaySting(filteredOptions: CustomSelectOptionComponent[]) {
    const checkAll = filteredOptions.find(item => item.checkAll == true);
    this.displayText = '';
    if (checkAll) {
      this.displayText = checkAll.value;
    } else {
      const valueOptions = filteredOptions.filter(item => !item.checkAll).map(item => item.value);
      this.displayText = valueOptions.join(', ');
    }
    this.selected = this._selectionModel.selected.filter(item => !item.checkAll).map(item => item.key);
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

   public markAllOptions () {
     if (this.options) {
        const _options = this.options.toArray();
        const checkAll = this.dropdownService.getCheckAll();
        if (this.markAll && this.multiple) {
        _options.forEach(item => {
          this._selectionModel.select(item);
        });
        this.displaySting(this._selectionModel.selected);
      }
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
     this.markAllOptions();
   }
  
   public onTouched() {
     this.onTouchedFn();
   }
  
   public onChange() {
     this.onChangeFn(this.selected);
   }
}
