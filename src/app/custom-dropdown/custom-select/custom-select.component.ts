import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { CustomDropdownComponent } from '../custom-dropdown.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { CustomDropdownService } from '../custom-dropdown.service';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [CustomDropdownService]
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
   });
  }

  public showDropdown() {
    this.dropdown.show();
  }
  
  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public selectOption(option: CustomSelectOptionComponent) {
    this.selected = option.key;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.value : '';
    this.hideDropdown();
    this.input.nativeElement.focus();
  }
   
  public hideDropdown() {
    this.dropdown.hide();
  }
}
